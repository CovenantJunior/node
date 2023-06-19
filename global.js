//Global Object
//console.log(global);
console.log("Initializing...");

global.setTimeout(() => {    
    clearInterval(int);
    console.log("Done");
}, 5000);

const int = global.setInterval(() => {
    console.log("Building...");
}, 1000);

console.log(__dirname);
console.log(__filename);
console.log(global.querySelector);