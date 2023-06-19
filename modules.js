const family = require('./people');
const { people, ages } = require('./people');
//console.log(people, ages);

const os = require('os');
console.log(os.platform(), os.homedir(), os.type(), os.arch(), os.release(), os.totalmem(), os.cpus());