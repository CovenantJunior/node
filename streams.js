const fs = require('fs');

const readStream = fs.createReadStream('docs/cover-letter.txt');
const writeStream = fs.createWriteStream('blogs/chunk.txt');

// readStream.on('data', (chunks) => {
//     console.log('--- NEW CHUNK ---');
//     console.log(chunks);
//     console.log('--- WRITE CHUNK ---\n\n');
//     writeStream.write('\n\n--- WRITE CHUNK ---\n\n');
//     writeStream.write(chunks);
// });

// Piping
readStream.pipe(writeStream);