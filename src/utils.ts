import * as path from 'path';
import * as fs from 'fs';
const packageConfig = require('../package.json');

export default {

    path: function (filePath) {
        if (~filePath.indexOf('/')) {
            return path.resolve(__dirname, '..', filePath);
        }
        return path.resolve(__dirname, '..', packageConfig[filePath]);
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