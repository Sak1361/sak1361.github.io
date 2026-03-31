/* ============================================
   sak1361.github.io — Common JavaScript
   ============================================ */

/* --- Icon map (SF Symbols name → emoji fallback) --- */
const APP_ICON_MAP = {
  'eye.trianglebadge.exclamationmark': '👁️',
  'water.waves': '🌊',
  'photo.on.rectangle.angled': '📸',
  'alarm.fill': '⏰',
  'moon.zzz.fill': '😴',
  'link.badge.plus': '🔗',
  'doc.text.viewfinder': '🧾',
  'calendar.badge.plus': '📅',
  'qrcode.viewfinder': '📱',
  'book.fill': '📚',
  'livephoto': '🎞️',
  'shippingbox.fill': '📦',
  'function': '🧮'
};

/* --- Language Toggle --- */
function switchLang() {
  const isCurrentJa = document.documentElement.lang === 'ja';
  setLang(isCurrentJa ? 'en' : 'ja');
}

function setLang(lang) {
  document.documentElement.lang = lang;
}

function detectLang() {
  const lang = navigator.language || navigator.userLanguage || 'ja';
  return lang.startsWith('ja') ? 'ja' : 'en';
}

/* --- Fetch apps.json --- */
async function fetchApps(basePath) {
  const res = await fetch(`${basePath}apps.json`);
  return (await res.json()).apps;
}
