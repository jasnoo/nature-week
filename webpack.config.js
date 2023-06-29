const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
}, {})
const path = require('path')



module.exports = {
    resolve: {
        fallback: {
            path: false,
            crypto: false,
            os: false,
        },
    },
    mode: process.env.NODE_ENV || 'production',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i, // scss 
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new webpack.DefinePlugin(envKeys),
        new NodePolyfillPlugin()

    ],
    devServer: {
        // static: {
        //     publicPath: 'build',
        //     directory: path.resolve(__dirname, 'build'),
        // },
        static: path.join(__dirname, 'build'),
        compress: true,
        liveReload: true,

        port: 8080,
        proxy: {
            '/': 'http://localhost:3000',
            '/find': 'http://localhost:3000',
            '/signup': 'http://localhost:3000',
            '/login': 'http://localhost:3000',
            '/favorites': 'http://localhost:3000',
        }
    }

}