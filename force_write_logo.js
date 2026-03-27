const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_2_1766702471614.png`;
const dest = path.resolve('public/images/logo_main.png');

console.log('Reading source file...');
try {
    const data = fs.readFileSync(src);
    console.log(`Read ${data.length} bytes.`);

    console.log('Writing to destination...');
    fs.writeFileSync(dest, data);
    console.log('Success.');
} catch (err) {
    console.error('Error:', err);
}
