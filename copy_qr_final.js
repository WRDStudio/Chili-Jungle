const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1766627647395.png`;
const dest = path.join(process.cwd(), 'public', 'images', 'qr_code.png');

console.log(`Copying QR code from: ${src}`);
try {
    fs.copyFileSync(src, dest);
    console.log('Success: qr_code.png created.');
} catch (err) {
    console.error('Error copying QR code:', err);
}
