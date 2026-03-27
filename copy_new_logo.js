import fs from 'fs';
import path from 'path';

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_2_1766702471614.png`;
const dest = path.resolve('public/images/logo_main.png');

console.log(`Copying transparent logo...`);
console.log(`SRC: ${src}`);
console.log(`DEST: ${dest}`);

try {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('SUCCESS: logo_main.png created.');
    } else {
        console.error('ERROR: Source file not found.');
    }
} catch (err) {
    console.error('ERROR:', err);
}
