const fs = require('fs');
const path = require('path');

// Classic QR (Red) - First upload
const srcClassic = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1766627647395.png`;
const destClassic = path.join(process.cwd(), 'public', 'images', 'qr_classic.png');

// Tropical QR (Green) - Second upload
const srcTropical = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1766627666525.png`;
const destTropical = path.join(process.cwd(), 'public', 'images', 'qr_tropical.png');

console.log('Copying QR codes...');

try {
    fs.copyFileSync(srcClassic, destClassic);
    console.log('Success: qr_classic.png created.');
} catch (err) {
    console.error('Error copying Classic QR:', err);
}

try {
    fs.copyFileSync(srcTropical, destTropical);
    console.log('Success: qr_tropical.png created.');
} catch (err) {
    console.error('Error copying Tropical QR:', err);
}
