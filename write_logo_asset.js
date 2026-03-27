const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_2_1766702471614.png`;
const dest = path.resolve('public/logo_main.png');

console.log('Reading source file...');
try {
    const data = fs.readFileSync(src);
    console.log(`Read ${data.length} bytes.`);

    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
        console.log(`Creating directory: ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
    }

    console.log('Writing to src/assets/logo_main.png...');
    fs.writeFileSync(dest, data);
    console.log('Success.');
} catch (err) {
    console.error('Error:', err);
}
