const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// this is our sass/css loader. It handles files that are require('something.scss')
const styles = {
    test: /\.(scss)$/,
    // here we pass the options as query params b/c it's short.
    // remember above we used an object for each loader instead of just a string?
    // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
    use: ExtractTextPlugin.extract(['css-loader?sourceMap', 'sass-loader?sourceMap'])
};
const vue = {
    test: /\.vue$/,
    loader: 'vue-loader'
};

module.exports = {
    entry: './resources/js/app.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [styles, vue]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    plugins: [
        new ExtractTextPlugin('css/style.css')
    ]
};