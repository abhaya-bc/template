const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: [
        "./src/scripts/index.js",
        "./src/styles/index.css",
    ],
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, "public"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: 'file-loader',
                generator: {
                        filename: 'img/[name][ext]'
                    }
            }
        ]
    },
    optimization : {
        minimizer: [ 
            "..." , 
            new CssMinimizerPlugin()
        ]
     },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            // favicon: "./src/img/icon.ico",
            title: "Document",
            inject: 'head',
            filename: 'index.[contenthash:8].html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            },
        }),
        new CleanWebpackPlugin()
    ],
}