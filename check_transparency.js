const fs = require('fs');
const path = require('path');

const files = [
    'public/images/hero-image2.png',
    'public/images/bottle-classic.png',
    'public/images/bottle-tropical.png'
];

files.forEach(file => {
    try {
        if (!fs.existsSync(file)) {
            console.log(`${file}: Not Found`);
            return;
        }

        const fd = fs.openSync(file, 'r');
        const buffer = Buffer.alloc(30);
        fs.readSync(fd, buffer, 0, 30, 0);
        fs.closeSync(fd);

        if (buffer.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
            console.log(`${file}: Not a valid PNG`);
            return;
        }

        const colorType = buffer.readUInt8(25);
        let hasAlpha = (colorType === 6 || colorType === 4);

        console.log(`${file}: Color Type ${colorType}, Has Alpha: ${hasAlpha}`);

    } catch (e) {
        console.log(`${file}: Error - ${e.message}`);
    }
});
