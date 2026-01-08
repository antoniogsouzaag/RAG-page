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

  try {
    await sharp(inputPath)
      .resize({ width: 1600 })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${base}.webp`));

    await sharp(inputPath)
      .resize({ width: 1600 })
      .avif({ quality: 60 })
      .toFile(path.join(outputDir, `${base}.avif`));

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
