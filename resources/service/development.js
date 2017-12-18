process.env.EXE_ENV = "run:dev";

var opn = require('opn');
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');

var evn = process.env.NODE_ENV || "production";
console.log("service/devlopment.js : evn =>" + evn);

var _webpackConfig = require('../webpack.config.js');

var webpackConfig = _webpackConfig;

Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./service/client'].concat(webpackConfig.entry[name]);
  //console.log('webpackConfig.entry[name]',webpackConfig.entry[name]);
});

var app = express();
var compiler = webpack(webpackConfig);
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: "/",
  quiet: true
});

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: function(){}
});
// 模版变化时刷新 
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload'});
        cb();
    })
});

if(evn=='development'){
  app.use(proxyMiddleware('/gateway/json',{ target:'http://223.111.8.105'}));
  app.use(proxyMiddleware('^/h5/gateway/json', {target:'http://223.111.8.105',pathRewrite: {'^/h5/gateway/json' : '/gateway/json'}}));
}else if(evn=='preview'){
  app.use(proxyMiddleware('/gateway/json',{ target:'http://game.migufun.com'}));
  app.use(proxyMiddleware('^/h5/gateway/json', {target:'http://game.migufun.com',pathRewrite: {'^/h5/gateway/json' : '/gateway/json'}}));
}else{
  app.use(proxyMiddleware('/gateway/json',{ target:'http://game.migufun.com'}));
  app.use(proxyMiddleware('^/h5/gateway/json', {target:'http://game.migufun.com',pathRewrite: {'^/h5/gateway/json' : '/gateway/json'}}));
}

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);


var port = 8080;
var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n');
})

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  opn(uri);
});