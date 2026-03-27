const fs = require('fs');
const path = require('path');

const dir = path.resolve('public/images');
const wrong = path.join(dir, 'logo_main.png.png');
const right = path.join(dir, 'logo_main.png');

if (fs.existsSync(wrong)) {
    console.log('Renaming...');
    try {
        fs.renameSync(wrong, right);
        console.log('Success: Renamed to logo_main.png');
    } catch (e) {
        console.error('Rename failed:', e);
    }
} else {
    console.log('File not found:', wrong);
    // Check if right already exists
    if (fs.existsSync(right)) {
        console.log('Target already exists, nothing to do.');
    }
}
