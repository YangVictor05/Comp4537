const fs = require('fs');

module.exports.appendToFile = (text, filePath, callback) => {
    fs.appendFile(filePath, text + '\n', 'utf8', (err) => {
        if (err) {
            console.error('Failed to append to the file:', err);
            return callback(false);
        }
        callback(true);
    });
};

module.exports.readFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return callback(false, null);
        }
        callback(true, data);
    });
};
