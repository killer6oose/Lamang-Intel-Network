'use strict';

// Toggle content type fields on schedule form
function toggleContentType(type) {
  const textGroup = document.getElementById('textContentGroup');
  const embedGroup = document.getElementById('embedContentGroup');
  if (!textGroup || !embedGroup) return;

  if (type === 'embed') {
    textGroup.classList.add('hidden');
    embedGroup.classList.remove('hidden');
  } else {
    textGroup.classList.remove('hidden');
    embedGroup.classList.add('hidden');
  }
}

// Toggle schedule type label/hint
function toggleScheduleType(type) {
  const label = document.getElementById('scheduleLabel');
  const hint = document.getElementById('scheduleHint');
  const input = document.getElementById('schedule');
  if (!label || !hint || !input) return;

  if (type === 'once') {
    label.textContent = 'Date & Time (UTC)';
    hint.innerHTML = 'ISO 8601 format. Example: <code>2025-06-02T09:00:00Z</code>';
    input.placeholder = '2025-06-02T09:00:00Z';
    input.type = 'text';
  } else {
    label.textContent = 'Cron Expression';
    hint.innerHTML = 'UTC timezone. Example: <code>0 9 * * 1</code> = every Monday 09:00 UTC';
    input.placeholder = '0 9 * * 1  (every Monday at 9am UTC)';
    input.type = 'text';
  }
}

// Auto-dismiss alerts after 5 seconds
document.addEventListener('DOMContentLoaded', function () {
  const alerts = document.querySelectorAll('.alert-success');
  alerts.forEach(function (el) {
    setTimeout(function () {
      el.style.transition = 'opacity 0.4s';
      el.style.opacity = '0';
      setTimeout(function () { el.remove(); }, 400);
    }, 5000);
  });
});
