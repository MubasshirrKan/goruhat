const fs = require('fs');
const PNG = require('pngjs').PNG;

// We use glob manually since it might not be installed, we'll just read the dir
const dir = 'public/cattle/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

files.forEach(file => {
    const filePath = dir + file;
    console.log(`Processing ${filePath}...`);
    
    fs.createReadStream(filePath)
        .pipe(new PNG())
        .on('parsed', function() {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let idx = (this.width * y + x) << 2;
                    
                    let r = this.data[idx];
                    let g = this.data[idx + 1];
                    let b = this.data[idx + 2];
                    
                    // If pixel is very close to white, make it transparent
                    if (r > 235 && g > 235 && b > 235) {
                        this.data[idx + 3] = 0; // alpha
                    }
                }
            }
            
            this.pack().pipe(fs.createWriteStream(filePath))
                .on('finish', () => console.log(`Finished ${filePath}`));
        })
        .on('error', err => console.error(err));
});
