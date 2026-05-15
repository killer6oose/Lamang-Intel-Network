<?php
/**
 * report-location.php
 * Receives community boss location reports from bosses.html.
 * Validates honeypot + math captcha, then appends to data/location-reports.json.
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// Only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// --- Honeypot check ---
// The "website" field is hidden from humans but bots tend to fill it
if (!empty($_POST['website'])) {
    // Silently succeed so bots don't know they failed
    echo json_encode(['ok' => true]);
    exit;
}

// --- Rate limiting (simple file-based, per IP) ---
$ip       = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ip       = preg_replace('/[^a-fA-F0-9.:,]/', '', $ip);
$ip_key   = substr(hash('sha256', $ip), 0, 12);
$rate_dir = __DIR__ . '/../data/rate-limits/';

if (!is_dir($rate_dir)) @mkdir($rate_dir, 0755, true);

$rate_file = $rate_dir . 'loc_' . $ip_key . '.json';
$now       = time();
$window    = 300;  // 5 minutes
$max_req   = 5;

$rate_data = ['timestamps' => []];
if (file_exists($rate_file)) {
    $rate_data = json_decode(file_get_contents($rate_file), true) ?? $rate_data;
}
// Keep only timestamps within window
$rate_data['timestamps'] = array_filter(
    $rate_data['timestamps'] ?? [],
    fn($t) => ($now - $t) < $window
);

if (count($rate_data['timestamps']) >= $max_req) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many submissions. Please wait a few minutes.']);
    exit;
}

// --- Captcha check ---
$answer   = isset($_POST['captcha_answer'])   ? intval($_POST['captcha_answer'])   : null;
$expected = isset($_POST['captcha_expected']) ? intval($_POST['captcha_expected']) : null;

if ($answer === null || $expected === null || $answer !== $expected || $expected < 2 || $expected > 24) {
    echo json_encode(['ok' => false, 'error' => 'Incorrect captcha answer.']);
    exit;
}

// --- Sanitise inputs ---
function sanitise(string $s, int $max = 120): string {
    return substr(trim(strip_tags($s)), 0, $max);
}

$boss_id   = sanitise($_POST['boss_id']   ?? '', 40);
$boss_name = sanitise($_POST['boss_name'] ?? '', 80);
$loc1      = sanitise($_POST['loc1']      ?? '', 80);
$loc2      = sanitise($_POST['loc2']      ?? '', 80);
$loc3      = sanitise($_POST['loc3']      ?? '', 80);
$notes     = sanitise($_POST['notes']     ?? '', 500);

if (empty($boss_id) || empty($loc1)) {
    echo json_encode(['ok' => false, 'error' => 'Missing required fields.']);
    exit;
}

// --- Build report entry ---
$locations = array_values(array_filter([$loc1, $loc2, $loc3], fn($l) => $l !== ''));

$report = [
    'id'         => uniqid('rpt_', true),
    'submitted'  => date('c'),
    'boss_id'    => $boss_id,
    'boss_name'  => $boss_name,
    'locations'  => $locations,
    'notes'      => $notes,
    'ip_hash'    => hash('sha256', $ip . date('Y-m-d')),  // daily-rotating hash, not raw IP
    'status'     => 'pending',   // pending | accepted | rejected
];

// --- Append to reports file ---
$reports_file = __DIR__ . '/../data/location-reports.json';

$lock = fopen($reports_file . '.lock', 'c');
if (!flock($lock, LOCK_EX)) {
    fclose($lock);
    echo json_encode(['ok' => false, 'error' => 'Server busy, please retry.']);
    exit;
}

$reports = [];
if (file_exists($reports_file)) {
    $existing = file_get_contents($reports_file);
    $reports  = json_decode($existing, true) ?? [];
}

// Cap at 500 pending reports to prevent runaway file growth
$pending_count = count(array_filter($reports, fn($r) => $r['status'] === 'pending'));
if ($pending_count >= 500) {
    flock($lock, LOCK_UN);
    fclose($lock);
    echo json_encode(['ok' => false, 'error' => 'Report queue full. Please try again later.']);
    exit;
}

$reports[] = $report;
file_put_contents($reports_file, json_encode($reports, JSON_PRETTY_PRINT));

flock($lock, LOCK_UN);
fclose($lock);

// --- Update rate limit ---
$rate_data['timestamps'][] = $now;
file_put_contents($rate_file, json_encode($rate_data));

echo json_encode(['ok' => true]);
