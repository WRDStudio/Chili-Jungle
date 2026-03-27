const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_2_1766702471614.png`;
const dest = path.resolve('components/logoData.ts');

console.log('Reading source image...');
try {
    const data = fs.readFileSync(src);
    const base64 = data.toString('base64');
    const mime = 'image/png';
    const content = `export const logoBase64 = "data:${mime};base64,${base64}";\n`;

    console.log('Writing to components/logoData.ts...');
    fs.writeFileSync(dest, content);
    console.log('Success.');
} catch (err) {
    console.error('Error:', err);
}
