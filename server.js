const http = require('http')

http.createServer(function(req, res) {
    console.log("Hi");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello <br>World!</br>');
}).listen(8888);

console.log("Server is running and listening ...");