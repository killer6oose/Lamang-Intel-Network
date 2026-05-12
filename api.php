<?php
/**
 * GZW Guides - Write API
 *
 * Handles all authenticated data writes. Reads are served directly
 * as static files (data/vulture.json, data/ammo.json, data/admin.json).
 *
 * SETUP (required before the admin panel will work):
 *   SSH into your server and run:
 *     echo "your-passphrase-here" > data/.adminpass
 *     chmod 600 data/.adminpass
 *   The passphrase file is gitignored and never enters source control.
 *
 * POST body (JSON): { "action": "...", "pass": "...", "data": {...} }
 * POST body (multipart): action=upload-image, pass=..., image=<file>
 *
 * Actions:
 *   first-setup   - set the initial passphrase (only works before data/.adminpass exists)
 *   verify        - check password, returns {ok:true} or 401
 *   save          - save a data file. Requires "file" (vulture|ammo|admin) + "data"
 *   change-pass   - change admin password. Requires "newPass"
 *   upload-image  - upload an ammo image. Multipart POST with 'image' file field.
 *                   Returns {ok:true, url:"data/images/filename.ext"}
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Paths
define('DATA_DIR',   __DIR__ . '/data/');
define('IMAGES_DIR', __DIR__ . '/data/images/');
define('PASS_FILE',  DATA_DIR . '.adminpass');

// Allowed data files
$ALLOWED_FILES = ['vulture', 'ammo', 'admin', 'bosses'];
$ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// --- Helpers ---

/**
 * Returns the stored passphrase, or false if not yet configured.
 */
function getPass() {
    if (file_exists(PASS_FILE)) {
        $p = trim(file_get_contents(PASS_FILE));
        if ($p !== '') return $p;
    }
    return false;
}

/**
 * Returns true if the admin passphrase has been configured.
 */
function isConfigured() {
    return getPass() !== false;
}

function checkPass($p) {
    $stored = getPass();
    return $stored !== false && is_string($p) && $p === $stored;
}

function respond($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function err($msg, $code = 400) {
    respond(['error' => $msg], $code);
}

// --- Handle multipart image upload separately ---
if (!empty($_FILES['image']) && isset($_POST['action']) && $_POST['action'] === 'upload-image') {
    $pass = isset($_POST['pass']) ? $_POST['pass'] : '';
    if (!checkPass($pass)) {
        err('Unauthorized', 401);
    }

    global $ALLOWED_IMAGE_TYPES;
    $file = $_FILES['image'];

    if ($file['error'] !== UPLOAD_ERR_OK) {
        err('Upload error: ' . $file['error']);
    }
    if ($file['size'] > 4 * 1024 * 1024) {
        err('Image too large (max 4 MB)');
    }

    $mime = mime_content_type($file['tmp_name']);
    if (!in_array($mime, $ALLOWED_IMAGE_TYPES, true)) {
        err('Invalid image type. Allowed: jpg, png, gif, webp');
    }

    $ext_map = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/gif' => 'gif', 'image/webp' => 'webp'];
    $ext = $ext_map[$mime];
    $filename = preg_replace('/[^a-z0-9_\-]/', '', strtolower(pathinfo($file['name'], PATHINFO_FILENAME)));
    if (!$filename) $filename = 'ammo';
    $filename = $filename . '_' . substr(md5(uniqid()), 0, 8) . '.' . $ext;

    if (!is_dir(IMAGES_DIR)) {
        mkdir(IMAGES_DIR, 0755, true);
    }

    $dest = IMAGES_DIR . $filename;
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        err('Failed to save image', 500);
    }

    respond(['ok' => true, 'url' => 'data/images/' . $filename]);
}

// --- Parse body (JSON actions) ---

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!is_array($body)) {
    err('Invalid JSON body');
}

$action = isset($body['action']) ? $body['action'] : '';
$pass   = isset($body['pass'])   ? $body['pass']   : '';

// --- Route ---

switch ($action) {

    // ---- FIRST-TIME SETUP ----
    // Only works before data/.adminpass exists. Once configured, use change-pass.
    case 'first-setup':
        if (isConfigured()) {
            err('Already configured. Use change-pass to update your passphrase.', 403);
        }

        $newPass = isset($body['newPass']) ? $body['newPass'] : '';

        if (!is_string($newPass) || strlen($newPass) < 8) {
            err('Passphrase must be at least 8 characters');
        }

        if (!is_dir(DATA_DIR)) {
            mkdir(DATA_DIR, 0755, true);
        }

        $written = file_put_contents(PASS_FILE, $newPass, LOCK_EX);

        if ($written === false) {
            err('Could not save passphrase. Check that data/ is writable (chmod 755 data/)', 500);
        }

        // Restrict file permissions - only web server user can read it
        chmod(PASS_FILE, 0600);

        respond(['ok' => true, 'message' => 'Passphrase configured. You can now log in.']);
        break;

    // ---- VERIFY ----
    case 'verify':
        if (!isConfigured()) {
            err('Admin not yet configured. Use the first-time setup form to set a passphrase.', 503);
        }
        if (checkPass($pass)) {
            respond(['ok' => true]);
        } else {
            err('Incorrect passphrase', 401);
        }
        break;

    // ---- SAVE FILE ----
    case 'save':
        if (!isConfigured()) { err('Not configured', 503); }
        if (!checkPass($pass)) {
            err('Unauthorized', 401);
        }

        global $ALLOWED_FILES;
        $file = isset($body['file']) ? $body['file'] : '';

        if (!in_array($file, $ALLOWED_FILES, true)) {
            err('Invalid file identifier. Must be: vulture, ammo, admin, or bosses.');
        }

        if (!isset($body['data'])) {
            err('Missing data field');
        }

        $path    = DATA_DIR . $file . '.json';
        $encoded = json_encode($body['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        if ($encoded === false) {
            err('Failed to encode data as JSON', 500);
        }

        $written = file_put_contents($path, $encoded, LOCK_EX);

        if ($written === false) {
            err('Write failed. Check that data/ and ' . $file . '.json are writable by the web server (chmod 644 data/' . $file . '.json)', 500);
        }

        respond(['ok' => true, 'bytes' => $written]);
        break;

    // ---- CHANGE PASSWORD ----
    case 'change-pass':
        if (!isConfigured()) { err('Not configured', 503); }
        if (!checkPass($pass)) {
            err('Incorrect current passphrase', 401);
        }

        $newPass = isset($body['newPass']) ? $body['newPass'] : '';

        if (!is_string($newPass) || strlen($newPass) < 8) {
            err('New passphrase must be at least 8 characters');
        }

        $written = file_put_contents(PASS_FILE, $newPass, LOCK_EX);

        if ($written === false) {
            err('Could not save passphrase. Check that data/ is writable (chmod 755 data/)', 500);
        }

        respond(['ok' => true]);
        break;

    default:
        err('Unknown action: ' . htmlspecialchars($action));
}
?>
