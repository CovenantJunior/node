//File System
const { execFileSync } = require('child_process');
const fs  = require('fs');

//reading files
fs.readFile('docs/vaccination_id.txt', (error, data) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(data.toString());
    }
});


// writing files
fs.writeFileSync('docs/memo.txt', 'Eat Dinner', (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Writen');
    }
});


//Make directories
if(fs.existsSync('blogs')) {
    console.log('Folder already exists');
    fs.rmdir('blogs', () => {
        console.log('Deleting...');
    });
}
else {
    fs.mkdir('blogs', () => {
        console.log('Created');
    });
};



//deleting files
// if (fs.existsSync('docs/memo.txt')) {
//     console.log('Files already exists');
//     fs.unlink('docs/memo.txt', () => {
//         console.log('Deleting...');
//     });
// }