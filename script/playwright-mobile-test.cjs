const { chromium, devices } = require('playwright');

(async () => {
  const iPhone = devices['iPhone 13'];
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  page.on('console', (msg) => {
    console.log(`[console:${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', (err) => {
    console.error('[pageerror]', err.message, err.stack);
  });
  page.on('requestfailed', (request) => {
    console.warn('[requestfailed]', request.url(), request.failure()?.errorText);
  });

  try {
    const candidates = ['http://localhost:5000', 'http://127.0.0.1:5000', 'http://192.168.0.93:5000', 'http://172.25.160.1:5000'];
    let lastErr = null;
    for (const url of candidates) {
      try {
        console.log('Trying', url);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 8000 });
        console.log('Opened', url);
        break;
      } catch (err) {
        console.warn('Failed to open', url, err.message || err);
        lastErr = err;
      }
    }

    if (!page.url() || page.url() === 'about:blank') {
      throw lastErr || new Error('Unable to open any URL');
    }

    // Wait a bit for client JS to run and possible runtime errors to appear
    await page.waitForTimeout(3000);

    // Take screenshot
    const fs = require('fs');
    try { fs.mkdirSync('tmp', { recursive: true }); } catch(e){}
    await page.screenshot({ path: 'tmp/mobile-screenshot.png', fullPage: true });
    console.log('Screenshot saved to tmp/mobile-screenshot.png');
  } catch (e) {
    console.error('Test script error', e);
  } finally {
    await browser.close();
  }
})();
