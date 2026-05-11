<?php
/**
 * GZW Guides - Write API
 *
 * Handles all authenticated data writes. Reads are served directly
 * as static files (data/vulture.json, data/ammo.json, data/admin.json).
 *
 * Setup notes:
 *   1. Make data/ writable by the web server: chmod 755 data/
 *   2. Make each .json file writable:          chmod 644 data/*.json
 *   3. Make data/images/ writable:             mkdir -p data/images && chmod 755 data/images
 *   4. On first run the default pass 'vulture2026' is used.
 *      Change it via the admin panel Settings tab.
 *   5. Using HTTPS is strongly recommended - the password is sent
 *      in the POST body and would be visible over plain HTTP.
 *
 * POST body (JSON): { "action": "...", "pass": "...", "data": {...} }
 * POST body (multipart): action=upload-image, pass=..., image=<file>
 *
 * Actions:
 *   verify        - check password, returns {ok:true} or 401
 *   save          - save a data file. Requires "file" (vulture|ammo|admin) + "data"
 *   change-pass   - change admin password. Requires "newPass"
 *   upload-image  - upload an ammo image. Multipart POST with 'image' file field.
 *                   Returns {ok:true, url:"data/images/filename.ext"}
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

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
define('DEFAULT_PASS', 'vulture2026');

// Allowed data files
$ALLOWED_FILES = ['vulture', 'ammo', 'admin', 'bosses'];
$ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// --- Helpers ---

function getPass() {
    if (file_exists(PASS_FILE)) {
        return trim(file_get_contents(PASS_FILE));
    }
    return DEFAULT_PASS;
}

function checkPass($p) {
    return is_string($p) && $p === getPass();
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

    // ---- VERIFY ----
    case 'verify':
        if (checkPass($pass)) {
            respond(['ok' => true]);
        } else {
            err('Incorrect passphrase', 401);
        }
        break;

    // ---- SAVE FILE ----
    case 'save':
        if (!checkPass($pass)) {
            err('Unauthorized', 401);
        }

        global $ALLOWED_FILES;
        $file = isset($body['file']) ? $body['file'] : '';

        if (!in_array($file, $ALLOWED_FILES, true)) {
            err('Invalid file identifier. Must be: vulture, ammo, or admin.');
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
        if (!checkPass($pass)) {
            err('Incorrect current passphrase', 401);
        }

        $newPass = isset($body['newPass']) ? $body['newPass'] : '';

        if (!is_string($newPass) || strlen($newPass) < 6) {
            err('New passphrase must be at least 6 characters');
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
