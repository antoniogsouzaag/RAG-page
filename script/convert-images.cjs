const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'attached_assets', 'generated_images');
const outputDir = path.join(__dirname, '..', 'attached_assets', 'generated_images', 'optimized');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function convertFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes(ext)) return;

  const base = path.basename(file, ext);
  const inputPath = path.join(inputDir, file);

  // generate multiple widths for responsive images
  const widths = [320, 640, 960, 1280, 1600];

  try {
    await Promise.all(widths.map(async (w) => {
      await sharp(inputPath)
        .resize({ width: w })
        .webp({ quality: Math.min(80, Math.round(80 * (w / 1600))) })
        .toFile(path.join(outputDir, `${base}-${w}.webp`));

      await sharp(inputPath)
        .resize({ width: w })
        .avif({ quality: Math.min(60, Math.round(60 * (w / 1600))) })
        .toFile(path.join(outputDir, `${base}-${w}.avif`));
    }));

    console.log('Converted', file);
  } catch (err) {
    console.error('Error converting', file, err);
  }
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Failed to read input dir', err);
    process.exit(1);
  }

  Promise.all(files.map(convertFile)).then(() => console.log('Done'));
});
