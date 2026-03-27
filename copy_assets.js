const fs = require('fs');
const path = require('path');

const files = [
    {
        src: String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_0_1766625781123.png`,
        dest: 'public/images/classic_label.png'
    },
    {
        src: String.raw`C:\Users\Wardo\.gemini\antigravity\brain\079d2a77-32b0-42e4-89cf-c6f592db84fa\uploaded_image_1_1766625781123.png`,
        dest: 'public/images/tropical_label.png'
    }
];

files.forEach(f => {
    try {
        fs.copyFileSync(f.src, f.dest);
        console.log(`Copied ${f.src} to ${f.dest}`);
    } catch (err) {
        console.error(`Error copying ${f.src}:`, err);
    }
});
