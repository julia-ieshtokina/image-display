const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);  
    })
    
  } else if(req.method === 'GET' && req.url === '/styles.css') {
    fs.readFile('./styles.css', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    }) 
  } else if(req.method === 'GET' && req.url === '/index.js') {
    fs.readFile('./index.js', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(data);
    }) 
  } else if(req.method === 'GET' && req.url === '/favicon.ico') {
    fs.readFile('./favicon.ico', (err, data) => {
      res.end(data);
    }) 
  }
}).listen(3000, () => console.log('Listening on port 3000'));