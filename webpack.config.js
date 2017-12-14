var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: './client/Client.jsx',
        vendor: [
            'jquery', 'lodash', 'moment', 'bootstrap',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('static/css/vendor.bundle.css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'static/js/vendor.bundle.js'),
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader",
                options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
        }]
    },
    devServer: {
        inline: true,
        port: 9000,
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
    },
    devtool: 'source-map',
};
