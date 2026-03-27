const fs = require('fs');
const path = require('path');

const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\0e35a5ee-b84b-4c0a-98a9-a405109415a1\uploaded_image_2_1768461159611.png`;
const dst = path.join(__dirname, 'public', 'images', 'costa_rica_flag_round.png');

console.log(`Copying from ${src} to ${dst}`);

try {
    if (!fs.existsSync(src)) {
        console.error('Source file does not exist!');
        process.exit(1);
    }

    fs.copyFileSync(src, dst);
    console.log('Copy successful!');

    if (fs.existsSync(dst)) {
        console.log(`Verified destination exists. Size: ${fs.statSync(dst).size}`);
    }

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
