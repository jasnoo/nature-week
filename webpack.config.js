const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')

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

    plugins: [new HtmlWebpackPlugin({
        title: 'Development',
        template: './index.html'
    })],
    devServer: {
        static: {
            publicPath: 'build',

            directory: path.resolve(__dirname, 'build'),
            // directory: path.join(__dirname, "client", "index.js"),
            // directory: path.resolve(__dirname, "./client/index.js")
            // directory: path.resolve(__dirname, "client/index.js")

        },
        // compress: true,
        port: 8080,
        proxy: {
            '/find': 'http://localhost:3000',
            '/signup': 'http://localhost:3000',
            '/login': 'http://localhost:3000',
            '/favorites': 'http://localhost:3000',

        }
    }

}