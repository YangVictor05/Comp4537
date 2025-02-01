const { getDate } = require('./utils');
const { appendToFile, readFile } = require('./FileHandler');
const messages = require('../lang/en/user');
const path = require('path');

class Routes {
    constructor() {
        this.basePath = path.join(__dirname, '../data');  // Base directory for file operations
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
            const filePath = path.join(this.basePath, 'file.txt');  // Save to 'data/file.txt'
            appendToFile(text, filePath, (success) => {
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
        const filePath = path.join(this.basePath, fileName);  // Read from 'data/file.txt'

        readFile(filePath, (success, data) => {
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
