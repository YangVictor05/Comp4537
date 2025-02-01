const http = require('http');
const Routes = require('./modules/routes');  // Import the Routes class

const routes = new Routes();  // Instantiate the Routes class

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // Routing logic based on the pathname
    if (pathname === '/getDate') {
        routes.getDateRoute(req, res);  // Handle the getDate route
    } else if (pathname === '/writeFile') {
        routes.writeFileRoute(req, res);  // Handle the writeFile route
    } else if (pathname.startsWith('/readFile')) {
        routes.readFileRoute(req, res);  // Handle the readFile route
    } else {
        routes.routeNotFound(req, res);  // Handle unknown routes
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
