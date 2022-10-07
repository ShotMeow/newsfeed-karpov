const path = require("path");

module.exports = {
    entry: './dist/script.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    }
}