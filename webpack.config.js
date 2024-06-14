const path = require('path')

module.exports = {
    entry: './js/main.js',
    mode: 'development',
    module: {
        rules: [
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        clean: true
    },
    devtool: 'source-map'
}