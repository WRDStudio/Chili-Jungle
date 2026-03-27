const fs = require('fs');
const path = require('path');

const source = "C:\\Users\\Wardo\\.gemini\\antigravity\\brain\\079d2a77-32b0-42e4-89cf-c6f592db84fa\\uploaded_image_1766706977795.png";
const dest = "C:\\Users\\Wardo\\.gemini\\antigravity\\scratch\\chili_jungle_webpage3\\public\\images\\logo_hero.png";

try {
    if (fs.existsSync(source)) {
        console.log(`Source found: ${source}`);
        fs.copyFileSync(source, dest);
        console.log(`Successfully copied to ${dest}`);
        const stats = fs.statSync(dest);
        console.log(`Destination file size: ${stats.size} bytes`);
    } else {
        console.error(`Source file NOT found: ${source}`);
        // List dir to help debug
        const dir = path.dirname(source);
        if (fs.existsSync(dir)) {
            console.log(`Directory ${dir} contents:`, fs.readdirSync(dir));
        }
    }
} catch (error) {
    console.error('Error copying file:', error);
}
