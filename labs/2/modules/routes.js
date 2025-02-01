const { getDate } = require('./utils');
const messages = require('../lang/en/user');
const FileHandler = require('./FileHandler');  // Import the FileHandler class
const path = require('path');

class Routes {
    constructor() {
        this.basePath = path.join(__dirname, '../data');  // Base directory for file operations
        this.fileHandler = new FileHandler(this.basePath);  // Instantiate the FileHandler class
    }

    // Handler for the '/getDate' route
    getDateRoute(req, res) {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const name = parsedUrl.searchParams.get('name') || messages.messages.guest;
        const currentDate = getDate();
        const responseMessage = messages.messages.greeting.replace('%1', name).replace('%2', currentDate);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<p style="color:blue;">${responseMessage}</p>`);
    }

    // Handler for the '/writeFile' route
    writeFileRoute(req, res) {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const text = parsedUrl.searchParams.get('text') || '';

        if (text) {
            const fileName = 'file.txt';  // Save to 'data/file.txt'
            this.fileHandler.appendToFile(text, fileName, (success) => {
                if (success) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(messages.messages.success);
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end(messages.messages.failure);
                }
            });
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(messages.messages.missingQuery);
        }
    }

    // Handler for the '/readFile' route
    readFileRoute(req, res) {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const fileName = parsedUrl.pathname.split('/').pop() || 'file.txt';

        this.fileHandler.readFile(fileName, (success, data) => {
            if (success) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Contents of ${fileName}: \n\n${data}`);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(messages.messages.notFound404.replace('%1', fileName));
            }
        });
    }

    // Default handler for unknown routes
    routeNotFound(req, res) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(messages.messages.routeNotFound);
    }
}

module.exports = Routes;
