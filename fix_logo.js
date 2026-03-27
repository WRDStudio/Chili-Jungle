import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handling ES modules dirname in Node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFile = String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1_1766626737735.png`;
const destDir = path.resolve('public/images');
const destFile = path.join(destDir, 'logo_final.png');

console.log('--- Logo Repair Script ---');
console.log(`Source: ${sourceFile}`);
console.log(`Dest:   ${destFile}`);

// 1. Check Source
if (!fs.existsSync(sourceFile)) {
    console.error('ERROR: Source file NOT FOUND at path!');
    process.exit(1);
}
console.log('OK: Source file exists.');

// 2. Ensure Dir
if (!fs.existsSync(destDir)) {
    console.log('Creating public/images directory...');
    fs.mkdirSync(destDir, { recursive: true });
}

// 3. Copy
try {
    fs.copyFileSync(sourceFile, destFile);
    console.log('SUCCESS: File copied.');
} catch (e) {
    console.error('ERROR: Copy failed:', e);
    process.exit(1);
}

// 4. Verify
if (fs.existsSync(destFile)) {
    const stats = fs.statSync(destFile);
    console.log(`VERIFIED: Destination exists. Size: ${stats.size} bytes.`);
} else {
    console.error('ERROR: Destination file missing after copy!');
}
