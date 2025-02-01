const fs = require('fs');
const path = require('path');

class FileHandler {
    constructor(basePath) {
        this.basePath = basePath;
    }

    // Append text to a file
    appendToFile(text, fileName, callback) {
        const filePath = path.join(this.basePath, fileName);
        fs.appendFile(filePath, text + '\n', 'utf8', (err) => {
            if (err) {
                console.error('Failed to append to the file:', err);
                return callback(false);
            }
            callback(true);
        });
    }

    // Read a file
    readFile(fileName, callback) {
        const filePath = path.join(this.basePath, fileName);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return callback(false, null);
            }
            callback(true, data);
        });
    }
}

module.exports = FileHandler;
