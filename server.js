var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var compiler = webpack(config);
var webpackDevMiddleware = require('webpack-dev-middleware'); //建立一个本地服务器
var webpackHotMiddleware = require('webpack-hot-middleware'); //代码及时更新
//在webpack入口添加hot-middleware
var entry = config.entry;
for (var i in entry) {
    if (i == 'vendors') {
        continue;
    };
    entry[i].unshift("webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true");
};

var app = express(); //初始化一个web服务
app.use(webpackDevMiddleware(compiler, {
    // noInfo: true,
    publicPath: config.output.publicPath,
    inline: true,
    stats: {
        colors: true
    }
}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

// app.get('*', function(req, res) { //匹配所有路径的请求
//   res.sendFile(path.join(__dirname, 'index.html'));//index.html发送到根目录下
// });
app.listen(3000, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at http://localhost:3000/');
});
