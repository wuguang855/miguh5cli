const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const resolve = function(dir) {
    return path.join(__dirname, dir);
} 
var evn = process.env.NODE_ENV || "production";

console.log("webpack.config.js : evn =>" + evn);

var hash = new Date().getTime();
var config = function (evn) {
  var _config = {
    entry: {
      <entry>
    },
    output: {
      filename: './js/[name].[hash:7].js',
      path: resolve('/dist'),
    },
    externals:{
      basic:'MG',
      jquery:'jQuery'
    },
    module: { 
      loaders: [
          {  
              test: '/\.js$/', 
              loader: 'babel-loader', 
              include: [resolve('./src')]
          },
          {
            test: /\.css$/,
            use:ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                {
                  loader:'css-loader'
                },
                {
                  loader:'postcss-loader',
                  options:{
                    plugins:function(){
                      return [
                        require('autoprefixer')
                      ]
                    }
                  }
                }       
              ]
            })
          },
          {
            test: /\.scss$/,
            use:ExtractTextPlugin.extract({
              fallback: "style-loader",
              use:['css-loader', 'sass-loader']
            })
          },
          { 
              test: /\.tpl$/,
              loader: 'ejs-loader'
          },
          {
            test: /\.(png|jpe?g|gif|svg|eot|woff|ttf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: './img/[name].[hash:7].[ext]'
            }
          }
      ]
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin('./css/[name].[contenthash].css'),
      <HtmlWebpackPlugin>
      
    ]
  };
  if(evn == "production"){
    _config.plugins.unshift(
      new webpack.optimize.UglifyJsPlugin({
        compress: false,
        warnings: false
      })
    );
    _config.devtool = 'nosources-source-map'
  }else {
    _config.plugins.push(
      new FriendlyErrorsPlugin()
    ); 
    _config.devtool =  'inline-source-map';
  }
  return _config;
}
module.exports = config(evn);