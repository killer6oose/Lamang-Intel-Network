<?php
/**
 * LIN Builder - Steam Auth + Saved Builds API
 *
 * Endpoints (all via ?action=...):
 *   GET  ?action=login     - redirect to Steam OpenID
 *   GET  ?action=callback  - validate Steam response, create session
 *   GET  ?action=me        - return current user or null
 *   GET  ?action=logout    - clear session
 *   GET  ?action=builds    - list saved builds for current user
 *   POST ?action=save      - save a build {name, encoded}
 *   POST ?action=delete    - delete a build {id}
 *
 * Setup:
 *   1. Create MySQL DB and fill in the constants below
 *   2. Get a free Steam API key at https://steamcommunity.com/dev/apikey
 *   3. Set STEAM_API_KEY and SITE_URL below
 *   4. Run the SQL in schema.sql to create the tables
 *   5. Place this file in your web root (same server as lamangintel.net)
 */

// ── Configuration ─────────────────────────────────────────────────────────────
define('STEAM_API_KEY', '405F864BCA34988B66602FFD929E2CC9');
define('SITE_URL',      'https://lamangintel.net');
define('BUILDER_URL',   'https://lamangintel.net/builder');
define('DB_HOST',       'localhost');
define('DB_NAME',       'admin_lamangintel');
define('DB_USER',       'admin_lamangintel');
define('DB_PASS',       'IG{+kh[0tX7g]sVJ');
define('MAX_BUILDS',    20); // max saved builds per user

// ── Bootstrap ─────────────────────────────────────────────────────────────────
session_name('lin_session');
session_set_cookie_params([
    'lifetime' => 60 * 60 * 24 * 30, // 30 days
    'path'     => '/',
    'domain'   => 'lamangintel.net',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

header('Content-Type: application/json');
// Same origin - no CORS headers needed. If you ever move the builder to a
// separate subdomain, add: header('Access-Control-Allow-Origin: https://...');

$action = $_GET['action'] ?? '';

// ── Router ────────────────────────────────────────────────────────────────────
switch ($action) {
    case 'login':    handleLogin();    break;
    case 'callback': handleCallback(); break;
    case 'me':       handleMe();       break;
    case 'logout':   handleLogout();   break;
    case 'builds':   handleBuilds();   break;
    case 'save':     handleSave();     break;
    case 'delete':   handleDelete();   break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Unknown action']);
}

// ── Steam OpenID helpers ───────────────────────────────────────────────────────

function steamLoginUrl(): string {
    $return = SITE_URL . '/steam.php?action=callback';
    $params = [
        'openid.ns'         => 'http://specs.openid.net/auth/2.0',
        'openid.mode'       => 'checkid_setup',
        'openid.return_to'  => $return,
        'openid.realm'      => SITE_URL,
        'openid.identity'   => 'http://specs.openid.net/auth/2.0/identifier_select',
        'openid.claimed_id' => 'http://specs.openid.net/auth/2.0/identifier_select',
    ];
    return 'https://steamcommunity.com/openid/login?' . http_build_query($params);
}

function validateSteamCallback(array $params): ?string {
    // Build the validation request
    $params['openid.mode'] = 'check_authentication';
    $response = httpPost('https://steamcommunity.com/openid/login', http_build_query($params));
    if (strpos($response, 'is_valid:true') === false) return null;

    // Extract Steam64 ID from claimed_id URL
    // e.g. https://steamcommunity.com/openid/id/76561198XXXXXXXXX
    if (!preg_match('#https://steamcommunity\.com/openid/id/(\d+)#', $params['openid.claimed_id'] ?? '', $m)) {
        return null;
    }
    return $m[1];
}

function getSteamProfile(string $steamId): array {
    $url = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key='
         . STEAM_API_KEY . '&steamids=' . $steamId;
    $data = json_decode(httpGet($url), true);
    $player = $data['response']['players'][0] ?? [];
    return [
        'steamId'  => $steamId,
        'username' => $player['personaname'] ?? 'Unknown',
        'avatar'   => $player['avatarmedium'] ?? '',
    ];
}

function httpPost(string $url, string $body): string {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $body,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response ?: '';
}

function httpGet(string $url): string {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response ?: '';
}

// ── DB helper ─────────────────────────────────────────────────────────────────

function db(): PDO {
    static $pdo;
    if ($pdo) return $pdo;
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
    return $pdo;
}

function currentUser(): ?array {
    return $_SESSION['steam_user'] ?? null;
}

// ── Action handlers ───────────────────────────────────────────────────────────

function handleLogin(): void {
    // Redirect is the only response - override Content-Type
    header('Content-Type: text/html');
    header('Location: ' . steamLoginUrl());
    exit;
}

function handleCallback(): void {
    header('Content-Type: text/html');

    $params = [];
    foreach ($_GET as $k => $v) {
        // URL params come with . replaced by _ in some PHP configs
        $params[str_replace('_', '.', $k)] = $v;
    }
    // Restore openid.ns since str_replace would corrupt it elsewhere - re-set directly
    if (isset($_GET['openid_ns']))         $params['openid.ns']         = $_GET['openid_ns'];
    if (isset($_GET['openid_mode']))       $params['openid.mode']       = $_GET['openid_mode'];
    if (isset($_GET['openid_op_endpoint'])) $params['openid.op_endpoint'] = $_GET['openid_op_endpoint'];
    if (isset($_GET['openid_claimed_id'])) $params['openid.claimed_id'] = $_GET['openid_claimed_id'];
    if (isset($_GET['openid_identity']))   $params['openid.identity']   = $_GET['openid_identity'];
    if (isset($_GET['openid_return_to']))  $params['openid.return_to']  = $_GET['openid_return_to'];
    if (isset($_GET['openid_response_nonce'])) $params['openid.response_nonce'] = $_GET['openid_response_nonce'];
    if (isset($_GET['openid_assoc_handle'])) $params['openid.assoc_handle'] = $_GET['openid_assoc_handle'];
    if (isset($_GET['openid_signed']))     $params['openid.signed']     = $_GET['openid_signed'];
    if (isset($_GET['openid_sig']))        $params['openid.sig']        = $_GET['openid_sig'];

    $steamId = validateSteamCallback($params);
    if (!$steamId) {
        header('Location: ' . BUILDER_URL . '?auth_error=1');
        exit;
    }

    $profile = getSteamProfile($steamId);

    // Upsert user in DB
    $pdo = db();
    $stmt = $pdo->prepare('
        INSERT INTO steam_users (steam_id, username, avatar)
        VALUES (:sid, :name, :avatar)
        ON DUPLICATE KEY UPDATE username = :name, avatar = :avatar, last_login = NOW()
    ');
    $stmt->execute([':sid' => $steamId, ':name' => $profile['username'], ':avatar' => $profile['avatar']]);

    $row = $pdo->prepare('SELECT id FROM steam_users WHERE steam_id = ?');
    $row->execute([$steamId]);
    $user = $row->fetch();

    $_SESSION['steam_user'] = [
        'id'       => (int)$user['id'],
        'steamId'  => $steamId,
        'username' => $profile['username'],
        'avatar'   => $profile['avatar'],
    ];

    header('Location: ' . BUILDER_URL);
    exit;
}

function handleMe(): void {
    echo json_encode(currentUser());
}

function handleLogout(): void {
    session_destroy();
    echo json_encode(['ok' => true]);
}

function handleBuilds(): void {
    $user = currentUser();
    if (!$user) { http_response_code(401); echo json_encode(['error' => 'Not logged in']); return; }

    $stmt = db()->prepare('
        SELECT id, name, encoded, created_at
        FROM saved_builds
        WHERE user_id = ?
        ORDER BY created_at DESC
    ');
    $stmt->execute([$user['id']]);
    echo json_encode($stmt->fetchAll());
}

function handleSave(): void {
    $user = currentUser();
    if (!$user) { http_response_code(401); echo json_encode(['error' => 'Not logged in']); return; }

    $body = json_decode(file_get_contents('php://input'), true);
    $name    = trim($body['name'] ?? 'Untitled Build');
    $encoded = trim($body['encoded'] ?? '');
    if (!$encoded) { http_response_code(400); echo json_encode(['error' => 'No build data']); return; }
    if (mb_strlen($name) > 200) $name = mb_substr($name, 0, 200);

    $pdo = db();

    // Enforce per-user build limit
    $count = $pdo->prepare('SELECT COUNT(*) FROM saved_builds WHERE user_id = ?');
    $count->execute([$user['id']]);
    if ((int)$count->fetchColumn() >= MAX_BUILDS) {
        http_response_code(400);
        echo json_encode(['error' => 'Build limit reached (' . MAX_BUILDS . '). Delete some builds first.']);
        return;
    }

    $stmt = $pdo->prepare('INSERT INTO saved_builds (user_id, name, encoded) VALUES (?, ?, ?)');
    $stmt->execute([$user['id'], $name, $encoded]);
    echo json_encode(['id' => (int)$pdo->lastInsertId(), 'ok' => true]);
}

function handleDelete(): void {
    $user = currentUser();
    if (!$user) { http_response_code(401); echo json_encode(['error' => 'Not logged in']); return; }

    $body = json_decode(file_get_contents('php://input'), true);
    $id = (int)($body['id'] ?? 0);
    if (!$id) { http_response_code(400); echo json_encode(['error' => 'No id']); return; }

    // Only delete builds belonging to this user
    $stmt = db()->prepare('DELETE FROM saved_builds WHERE id = ? AND user_id = ?');
    $stmt->execute([$id, $user['id']]);
    echo json_encode(['ok' => true]);
}
