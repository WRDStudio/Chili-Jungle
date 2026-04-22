const fs = require('fs');
const path = require('path');

const replacements = [
  ['/images/bottle-classic.png', '/images/bottle-classic.webp'],
  ['/images/bottle-tropical.png', '/images/bottle-tropical.webp'],
  ['/images/bottle-classic-view.png', '/images/bottle-classic-view.webp'],
  ['/images/bottle-tropical-view.png', '/images/bottle-tropical-view.webp'],
  ['/images/bottle-classic2.png', '/images/bottle-classic2.webp'],
  ['/images/bottle-classic3.png', '/images/bottle-classic3.webp'],
  ['/images/bottle-tropical4.png', '/images/bottle-tropical4.webp'],
  ['/images/hero-image2.png', '/images/hero-image2.webp'],
  ['/images/hero-image22.png', '/images/hero-image22.webp'],
  ['/images/logo_main.png.png', '/images/logo_main.png.webp'],
  ['/images/logo_main2.png.png', '/images/logo_main2.png.webp'],
  ['/images/logo_transparent2.png', '/images/logo_transparent2.webp'],
  ['/images/DumplingsCJ.png', '/images/DumplingsCJ.webp'],
  ['/images/TacosCJ.png', '/images/TacosCJ.webp'],
  ['/images/WingsCJ.png', '/images/WingsCJ.webp'],
  ['/images/VainillaCJ.png', '/images/VainillaCJ.webp'],
  ['/images/Tamarindo_sunset_2025.jpg', '/images/Tamarindo_sunset_2025.webp'],
  ['/images/classic_label.png', '/images/classic_label.webp'],
  ['/images/tropical_label.png', '/images/tropical_label.webp'],
  ['/images/gallery_1.jpg', '/images/gallery_1.webp'],
  ['/images/gallery_2.png', '/images/gallery_2.webp'],
  ['/images/gallery_3.jpg', '/images/gallery_3.webp'],
  ['/images/gallery_4.jpg', '/images/gallery_4.webp'],
  ['/images/gallery_5.png', '/images/gallery_5.webp'],
  ['/images/gallery_6.jpg', '/images/gallery_6.webp'],
  ['/images/gallery_7.jpg', '/images/gallery_7.webp'],
  ['/images/gallery_8.jpg', '/images/gallery_8.webp'],
  ['/images/ingredientes-aceite.png', '/images/ingredientes-aceite.webp'],
  ['/images/ingredientes-ajo.png', '/images/ingredientes-ajo.webp'],
  ['/images/ingredientes-chiles.png', '/images/ingredientes-chiles.webp'],
  ['/images/ingredientes-cilantro.jpg', '/images/ingredientes-cilantro.webp'],
  ['/images/ingredientes-especias.png', '/images/ingredientes-especias.webp'],
  ['/images/ingredientes-jengibre.png', '/images/ingredientes-jengibre.webp'],
  ['/images/ingredientes-mezcla.png', '/images/ingredientes-mezcla.webp'],
  ['/images/ingredientes-reaper.png', '/images/ingredientes-reaper.webp'],
  ['/images/ingredientes-sal.png', '/images/ingredientes-sal.webp'],
  ['/images/ingredientes-sesamo.png', '/images/ingredientes-sesamo.webp'],
];

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git', 'dist'].includes(entry.name)) {
      processDir(fullPath);
    } else if (entry.isFile() && /\.(tsx|ts|html)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [from, to] of replacements) {
        if (content.includes(from)) {
          content = content.split(from).join(to);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('✓ Updated:', fullPath);
      }
    }
  }
}

processDir('.');
console.log('\nDone! All image references updated to WebP.');
