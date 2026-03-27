const fs = require('fs');
const path = require('path');

// Explicit raw strings to avoid escaping issues
const src = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1_1766626737735.png`;
const dest = path.join(process.cwd(), 'public', 'images', 'logo.png');

console.log(`Attempting copy:`);
console.log(`FROM: ${src}`);
console.log(`TO:   ${dest}`);

try {
    if (!fs.existsSync(src)) {
        console.error('ERROR: Source file does not exist!');
        process.exit(1);
    }

    // Create dir if missing
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.copyFileSync(src, dest);
    console.log('SUCCESS: Logo copied.');
} catch (error) {
    console.error('CRITICAL FAILURE:', error);
}
