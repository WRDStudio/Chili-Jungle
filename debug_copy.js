const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_2_1766702471614.png`;
const dest = path.resolve('public/logo_main.png');

console.log('--- DEBUG COPY ---');
console.log('Node version:', process.version);
console.log('CWD:', process.cwd());
console.log('Source:', src);
console.log('Dest:', dest);

try {
    if (!fs.existsSync(src)) {
        console.error('ERROR: Source missing!');
        process.exit(1);
    }
    console.log('Source exists. Size:', fs.statSync(src).size);

    console.log('Copying...');
    fs.copyFileSync(src, dest);
    console.log('Copy command executed.');

    if (fs.existsSync(dest)) {
        console.log('SUCCESS: Dest exists. Size:', fs.statSync(dest).size);
    } else {
        console.error('ERROR: Dest missing after copy!');
    }
} catch (e) {
    console.error('EXCEPTION:', e);
}
