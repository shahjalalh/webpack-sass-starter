var path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: {
        app: path.resolve(__dirname, './static/js/src/main.js'),

    },
    output: {
        path: path.resolve(__dirname, './static/js/'),
        filename: 'bundle.js',
        chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        rules: [
            // babel - es6 code is converted to es5
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'react'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },

            // use to extract css from js file
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader"],
                    fallback: "style-loader",
                    publicPath: path.resolve(__dirname, '/static/css')

                })
            }

        ]
    },

    plugins: [


        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: false,
            allChunks: true
        }),

        //reduce react size
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),


        new webpack.optimize.AggressiveMergingPlugin()

    ]

};
