const fs = require('fs');
const file = 'C:/Users/Wardo/.gemini/antigravity/brain/079d2a77-32b0-42e4-89cf-c6f592db84fa/uploaded_image_1766724398918.png';

try {
    const buffer = Buffer.alloc(8);
    const fd = fs.openSync(file, 'r');
    fs.readSync(fd, buffer, 0, 8, 0);
    fs.closeSync(fd);

    console.log('Hex Header:', buffer.toString('hex'));
    if (buffer.toString('hex').startsWith('89504e47')) console.log('Type: PNG');
    else if (buffer.toString('hex').startsWith('47494638')) console.log('Type: GIF');
    else console.log('Type: Unknown');
} catch (e) {
    console.log('Error:', e.message);
}
