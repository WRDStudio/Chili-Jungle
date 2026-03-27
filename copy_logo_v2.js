const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1_1766626737735.png`;
const dest = path.resolve('public/images/logo_v2.png');

console.log(`Copying ${src} to ${dest}`);

try {
    fs.copyFileSync(src, dest);
    console.log('Success!');
} catch (err) {
    console.error('Failed:', err);
}
