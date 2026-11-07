// Regenerates public/images/og-image.png (1200x630 link preview) from og-image.html.
// Run from the portfolio/ folder after changing the photo or copy:  node scripts/og-image/render.cjs
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto('file://' + path.join(__dirname, 'og-image.html'), { waitUntil: 'networkidle' });
  const png = await page.screenshot();
  await browser.close();
  const out = path.join(__dirname, '../../public/images/og-image.png');
  await sharp(png).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(out);
  console.log('Wrote', out);
})();
