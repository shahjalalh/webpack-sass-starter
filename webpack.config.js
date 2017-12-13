var path = require('path');

module.exports = {
    entry: {
        app: './client/Client.jsx',
        vendor: [
            'jquery', 'lodash', 'bootstrap',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js'
    },
    plugins: [
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
