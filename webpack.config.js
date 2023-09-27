require("@babel/polyfill");
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');

mode: 'development',

module.exports = {
    entry: {
        main: ["@babel/polyfill",'./src/index.js']
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        port: 9000
    },


    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html')
    }),



        new CleanWebpackPlugin()],
    module: {
        rules: [

            {
                test: /\.m?js$/,
                exclude: /node_modules/,

                    loader:
                            "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env',
                                "@babel/preset-react"
                            ]


                }
            },

            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [   "style-loader",
                    "css-loader",
                    "less-loader"]
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },

                [new BundleTracker({filename: './webpack-stats.json'})]

        ],
    }
}