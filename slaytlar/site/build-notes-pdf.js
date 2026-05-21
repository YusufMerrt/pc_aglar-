#!/usr/bin/env node
/**
 * notes.js içeriğinden yazdırılabilir HTML ve PDF üretir.
 * Gereksinim: Google Chrome veya Chromium (macOS'ta varsayılan yol denenir).
 *
 * Kullanım: node build-notes-pdf.js
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { NOTES } = require('./notes.js');

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const modulesHtml = NOTES.map((m) => `
  <section class="module" id="${escapeHtml(m.id)}">
    <h1 class="module-title">${escapeHtml(m.title)}</h1>
    ${m.sections.map((s) => `
      <div class="section">
        <h2>${escapeHtml(s.h)}</h2>
        <div class="body">${s.body}</div>
      </div>
    `).join('')}
  </section>
`).join('\n');

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ITN v7 Modül 1-9 Ders Notları</title>
  <style>
    @page { margin: 12mm; size: A4; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
        Arial, "Noto Sans", sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #0f172a;
      margin: 0;
      padding: 16px;
    }
    h1.module-title {
      font-size: 16pt;
      color: #1d4ed8;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 6px;
      margin: 24px 0 14px;
      page-break-after: avoid;
    }
    section.module:first-child h1.module-title { margin-top: 0; }
    h2 {
      font-size: 11.5pt;
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      padding: 6px 10px;
      margin: 16px 0 8px;
      page-break-after: avoid;
    }
    .body p { margin: 6px 0; }
    .body ul, .body ol { margin: 6px 0; padding-left: 22px; }
    .body li { margin: 3px 0; }
    .body b, .body strong { color: #1d4ed8; }
    .body code {
      background: #f1f5f9;
      padding: 1px 4px;
      border-radius: 3px;
      font-size: 9.5pt;
      font-family: ui-monospace, "SF Mono", Consolas, monospace;
    }
    .body pre {
      background: #0f172a;
      color: #e2e8f0;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 9pt;
      line-height: 1.45;
      white-space: pre-wrap;
      word-break: break-word;
      page-break-inside: avoid;
      font-family: ui-monospace, "SF Mono", Consolas, monospace;
    }
    .body pre code { background: transparent; color: inherit; padding: 0; }
    .cover {
      text-align: center;
      padding: 36mm 16mm;
      page-break-after: always;
    }
    .cover h1 { font-size: 22pt; margin: 0 0 10px; color: #0f172a; }
    .cover .sub { color: #64748b; font-size: 12pt; margin: 0; }
    .cover .meta {
      margin-top: 28px;
      font-size: 9.5pt;
      color: #64748b;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="cover">
    <h1>ITN v7 · Modül 1–9</h1>
    <p class="sub">Ders notları — vize özeti</p>
    <p class="meta">
      Introduction to Networks (Cisco Networking Academy)<br />
      Kaynak: ITN v7 Modül 1–9 slaytları · Türkçe özet
    </p>
  </div>
${modulesHtml}
</body>
</html>`;

const siteDir = __dirname;
const htmlOut = path.join(siteDir, 'ITN_Modul_1-9_Ders_Notlari.html');
const pdfOut = path.join(siteDir, 'ITN_Modul_1-9_Ders_Notlari.pdf');

fs.writeFileSync(htmlOut, html, 'utf8');
console.log('HTML yazıldı:', htmlOut);

function findChrome() {
  if (process.platform === 'darwin') {
    const candidates = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) return p;
    }
  }
  if (process.platform === 'linux') {
    for (const bin of ['google-chrome-stable', 'google-chrome', 'chromium-browser', 'chromium']) {
      try {
        execFileSync('which', [bin], { stdio: 'ignore' });
        return bin;
      } catch (_) {}
    }
  }
  if (process.platform === 'win32') {
    const candidates = [
      process.env.PROGRAMFILES + '\\Google\\Chrome\\Application\\chrome.exe',
      process.env['PROGRAMFILES(X86)'] + '\\Google\\Chrome\\Application\\chrome.exe'
    ].filter(Boolean);
    for (const p of candidates) {
      if (p && fs.existsSync(p)) return p;
    }
  }
  return null;
}

const chrome = findChrome();
if (!chrome) {
  console.error(
    'Chrome / Chromium / Edge bulunamadı. PDF üretilemedi.\n' +
      'HTML dosyasını tarayıcıda açıp "Yazdır → PDF olarak kaydet" kullanabilirsiniz:\n' +
      htmlOut
  );
  process.exit(2);
}

const fileUrl = pathToFileURL(htmlOut);

function pathToFileURL(absPath) {
  const p = path.resolve(absPath).replace(/\\/g, '/');
  if (!p.startsWith('/')) return 'file:///' + p;
  return 'file://' + p;
}

try {
  execFileSync(
    chrome,
    ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdfOut}`, fileUrl],
    { stdio: 'inherit' }
  );
} catch (e) {
  console.error('PDF yazılamadı:', e.message);
  process.exit(1);
}

if (!fs.existsSync(pdfOut) || fs.statSync(pdfOut).size < 1000) {
  console.error('PDF dosyası oluşmadı veya çok küçük. HTML ile manuel yazdırın:', htmlOut);
  process.exit(3);
}

console.log('PDF yazıldı:', pdfOut);
