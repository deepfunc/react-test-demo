const path = require('path');
const webpack = require('webpack');

const rootDir = __dirname;

module.exports = {
    context: rootDir,
    devtool: 'cheap-module-source-map',
    entry: './src/client/app.js',
    output: {
        path: path.join(rootDir, 'dist'),
        filename: 'app.js',
        publicPath: 'http://localhost:7000/dist/'
    },
    resolve: {
        alias: {
            '@': path.join(rootDir, 'src/client')
        },
        extensions: ['.js', '.jsx', '.json']
    },
    devServer: {
        port: 7000,
        publicPath: '/dist/',
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[name]--[local]-[hash:base64:5]',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        })
    ]
};