const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const extensions = ['.png', '.jpg', '.jpeg'];

// Skip animated GIF (can't convert easily) and SVG
const files = fs.readdirSync(inputDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return extensions.includes(ext);
});

let totalSaved = 0;

(async () => {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputFile = path.basename(file, path.extname(file)) + '.webp';
    const outputPath = path.join(inputDir, outputFile);

    const originalSize = fs.statSync(inputPath).size;

    try {
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      const saved = originalSize - newSize;
      totalSaved += saved;
      console.log(`✓ ${file} → ${outputFile}  |  ${(originalSize/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB  (saved ${(saved/1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
})();
