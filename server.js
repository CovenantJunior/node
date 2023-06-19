const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const num = _.random(0, 10);
    console.log(num);

    const greet = _.once(() => {
        console.log("Good Morning baby!!!");
    });

    greet();
    greet();

    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'home.html'
            res.statusCode = 200
            break;

        case '/home':
            path += 'home.html'
            res.statusCode = 200
            break;
    
        case '/about':
            path += 'about.html'
            res.statusCode = 200
            break;
        
        case '/about-me':
            res.statusCode = 301
            res.setHeader('location', '/about')
            res.end();
            break;
        
        default:
            path += '404.html'
            res.statusCode = 404
            break;
    }
    
    // Set header content type
    res.setHeader('Content-Type', 'text/html');
    // res.write('<html><head><title>NodeJS</title></head><body><h1>Hello Tea</h1></body></html>');
    fs.readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            res.end();
        }
        else {
            // res.write(data);
            res.end(data);
        }
    });
    
});
server.listen(5000, 'localhost', () => {
    console.log('Listening... localhost:5000');
});