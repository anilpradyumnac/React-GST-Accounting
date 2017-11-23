var ExtractTextPlugin = require('extract-text-webpack-plugin');
require('babel-polyfill');
const extractSass = new ExtractTextPlugin({
});
var path = require('path');
require('babel-runtime/regenerator');
 

// const autoprefixer = require('autoprefixer');
console.log(__dirname);
module.exports = {
    entry: [path.resolve(__dirname, 'src', 'Main.js')],
    node: {
     fs: 'empty'
    },
    output: {
        path: __dirname+'/output',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react' , 'stage-1'],
                plugins: [ "transform-runtime" ]
            }
        }
        , {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url-loader?limit=10000',
        },
        {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"]
        }      

       ]
    },
    plugins: [
        extractSass
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
    }
};
console.log("Entry at"+module.exports.entry);