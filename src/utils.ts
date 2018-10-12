import * as path from 'path';
import * as fs from 'fs';
const packageConfig = require('../package.json');

export default {

    path: function (key) {
        return path.resolve(__dirname, '..', packageConfig[key]);
    },
    read: function (filePath, callback) {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.log('cannot read file:' + filePath);
                console.log(err);
                return;
            }
            callback(data);
        });
    }

};