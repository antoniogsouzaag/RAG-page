#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const outDir = path.resolve(process.cwd(), 'captures');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const messages = [];

  page.on('console', (msg) => {
    try {
      const loc = msg.location ? msg.location() : undefined;
      const entry = { type: 'console', subtype: msg.type(), text: msg.text(), location: loc };
      messages.push(entry);
      console.log('CONSOLE:', entry);
    } catch (e) {
      console.log('CONSOLE (error reading):', msg.type(), msg.text());
    }
  });

  page.on('pageerror', (err) => {
    const entry = { type: 'pageerror', message: err.message, stack: err.stack };
    messages.push(entry);
    console.error('PAGEERROR:', entry);
  });

  page.on('requestfailed', (req) => {
    const f = req.failure && req.failure();
    const entry = { type: 'requestfailed', url: req.url(), errorText: f && f.errorText };
    messages.push(entry);
    console.log('REQUESTFAILED:', entry);
  });

  // Navigate
  try {
    await page.goto('http://127.0.0.1:5000', { waitUntil: 'networkidle', timeout: 20000 });
  } catch (e) {
    console.error('Navigation error:', e.message);
    messages.push({ type: 'navigationError', message: e.message, stack: e.stack });
  }

  // Wait extra time for lazy loads / async errors
  await page.waitForTimeout(5000);

  // Save screenshot
  const screenshotPath = path.join(outDir, 'page.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  // Save HTML
  const html = await page.content();
  fs.writeFileSync(path.join(outDir, 'page.html'), html);

  // Save messages
  fs.writeFileSync(path.join(outDir, 'capture.json'), JSON.stringify(messages, null, 2));

  await browser.close();
  console.log('Captured logs written to', outDir);
})().catch((err) => {
  console.error('Fatal error in capture script:', err);
  process.exit(1);
});