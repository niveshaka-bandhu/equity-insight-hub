/* ============================================================
   NIVESHAKA-BANDHU — app.js
   Handles: tab navigation, market summary cards,
   ticker bar population from the scraped index data.
   ============================================================ */

/* ── 1. NAVIGATION ────────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.tab-section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.tab;

    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    link.classList.add('active');
    const section = document.getElementById(target);
    if (section) {
      section.classList.add('active');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 2. MARKET DATA FROM SHEET INDEX PAGE ─────────────────── */
/*
  The sheet's homepage (tab index) already contains the Market Summary
  rows 17-25 from our earlier fetch. We'll parse those static values
  that were visible in the page and use them as seed data, while
  displaying "last updated" from the sheet itself.

  Data sourced from the fetched sheet index (May 10 2026 snapshot):
*/
const MARKET_DATA = {
  sensex:    { val: '77,328', chg: '−516.34', dir: 'down' },
  nifty:     { val: '24,176', chg: '−150.50', dir: 'down' },
  gift:      { val: '24,280', chg: '+62.00 (0.26%)', dir: 'up' },
  usd:       { val: '₹94.43', chg: 'USD Index: 97.84', dir: 'neutral' },
  nasdaq:    { val: '26,247', chg: '+1.71%', dir: 'up' },
  dow:       { val: '49,609', chg: '+0.02%', dir: 'up' },
  gold:      { val: '₹1,52,589', chg: '+59 (0.04%)', dir: 'up' },
  silver:    { val: '₹2,61,999', chg: '+3,459 (1.34%)', dir: 'up' },
  usdindex:  { val: '97.84', chg: '−0.43%', dir: 'down' },
};

function applyMarket() {
  // Market Summary Cards
  setText('ms-sensex', MARKET_DATA.sensex.val);
  setChg('ms-sensex-chg', MARKET_DATA.sensex.chg, MARKET_DATA.sensex.dir);
  setText('ms-nifty', MARKET_DATA.nifty.val);
  setChg('ms-nifty-chg', MARKET_DATA.nifty.chg, MARKET_DATA.nifty.dir);
  setText('ms-gift', MARKET_DATA.gift.val);
  setChg('ms-gift-chg', MARKET_DATA.gift.chg, MARKET_DATA.gift.dir);
  setText('ms-usd', MARKET_DATA.usd.val);
  setChg('ms-usd-chg', MARKET_DATA.usd.chg, 'neutral');

  // Currency Cards
  setText('c-usd', '₹94.43');
  setText('c-gold', '₹1,52,589');
  setText('c-silver', '₹2,61,999');
  setText('c-usdindex', '97.84');

  // Ticker
  setText('t-sensex',   '77,328 ▼');
  setText('t-sensex2',  '77,328 ▼');
  setText('t-nifty',    '24,176 ▼');
  setText('t-nifty2',   '24,176 ▼');
  setText('t-nasdaq',   '26,247 ▲');
  setText('t-nasdaq2',  '26,247 ▲');
  setText('t-dow',      '49,609 ▲');
  setText('t-usdinr',   '₹94.43');
  setText('t-gold',     '₹1,52,589 ▲');
  setText('t-giftnifty','24,280 ▲');

  // Color the mkt-chg elements
  colorChg('ms-sensex-chg', 'down');
  colorChg('ms-nifty-chg',  'down');
  colorChg('ms-gift-chg',   'up');

  // Color ticker spans
  colorEl('t-sensex',  'down');
  colorEl('t-sensex2', 'down');
  colorEl('t-nifty',   'down');
  colorEl('t-nifty2',  'down');
  colorEl('t-nasdaq',  'up');
  colorEl('t-nasdaq2', 'up');
  colorEl('t-dow',     'up');
  colorEl('t-gold',    'up');
  colorEl('t-giftnifty','up');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setChg(id, text, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  colorChg(id, dir);
}
function colorChg(id, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.color = dir === 'up'   ? 'var(--up)'
                 : dir === 'down' ? 'var(--down)'
                 : 'var(--cream-dim)';
}
function colorEl(id, dir) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.color = dir === 'up' ? 'var(--up)' : 'var(--down)';
}

/* ── 3. HASH-BASED ROUTING ────────────────────────────────── */
function routeFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;
  const link = document.querySelector(`[data-tab="${hash}"]`);
  if (link) link.click();
}

/* ── 4. SHEET TAB GID MAP ─────────────────────────────────── */
/*
  Update these GID values to match your actual sheet tab GIDs.
  Find them in the URL when you click each tab:
  ...spreadsheets/d/SHEET_ID/edit#gid=XXXXXX
*/
const TAB_GIDS = {
  'global-indices': '',        // index / first sheet
  'market-data':    '',        // update with actual gid
  'ipo':            '',
  'currencies':     '',
  'ace-investors':  '',
};

function updateIframes() {
  const BASE = 'https://docs.google.com/spreadsheets/d/1xoUJqge0b4SQmZSRLZyoBBcokXrUrFVt8fBFoef28NQ/htmlview';
  document.querySelectorAll('.sheet-embed').forEach(iframe => {
    const section = iframe.closest('.tab-section');
    if (!section) return;
    const tabId = section.id;
    const gid = TAB_GIDS[tabId];
    iframe.src = gid ? `${BASE}?gid=${gid}` : BASE;
  });
}

/* ── 5. INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  applyMarket();
  updateIframes();
  routeFromHash();

  // Announce last-updated in console for debugging
  console.log('Niveshaka-bandhu loaded. Last seed data: 10-May-2026.');
  console.log('To get live GIDs: open your sheet, click each tab, copy the gid= value from the URL, and update TAB_GIDS in app.js.');
});

window.addEventListener('hashchange', routeFromHash);
