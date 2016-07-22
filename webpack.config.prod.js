var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var TPL_PATH = path.resolve(__dirname, 'src/template'); //html模板路径
var LIB_PATH = path.resolve(__dirname, 'node_modules'); //项目依赖模块路径
var SRC_PATH = path.resolve(__dirname, 'src'); //项目开发路径
var BUILD_PATH = path.resolve(__dirname, 'build'); //项目打包输出路径

module.exports = {
    entry: { //配置多入口，每个页面单独输出打包后的页面
        index: ["./src/page/home/index"],
        hello: ["./src/page/hello/index"],
        //添加要打包在lib里面的库
        lib: ['jquery','react','react-dom']
    },
    output: {
        path: BUILD_PATH, //打包输出目录
        filename: 'js/bundle.[name].js', //输出文件名
        sourceMapFilename: '[name].map',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'] //添加此项，引入js或者jsx无需写后缀
    },
    module: {
        loaders: [{
            test: /\.js?$/, //解析jsx,js等
            exclude: [LIB_PATH], //排除node_modules目录，加快打包速度
            include: [SRC_PATH],
            loader: 'babel'
        }, {
            test: /\.css$/,
            exclude: [LIB_PATH],
            include: [SRC_PATH],
            loader: ExtractTextPlugin.extract("style", "css")
        }, {
            test: /\.scss$/,
            exclude: [LIB_PATH],
            include: [SRC_PATH],
            loader: ExtractTextPlugin.extract("style", "css!sass?sourceMap")
        }, {
            test: /\.(png|jpe?g|gif|webp)$/,
            loader: 'url-loader?limit=4096&name=assets/img/[name][hash].[ext]'
        }, {
            test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=assets/fonts/[name].[ext]'
        }, {
            test: /\.svg$/,
            loader: "url-loader?limit=4096&name=assets/img/vectors/[name][hash].[ext]"
        }]
    },
    plugins: [
      new ExtractTextPlugin("css/[name].css"), //单独使用style标签加载css并设置其路径
      //把入口文件里面的数组打包成common.js
       new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            chunks: ["index", "hello"]
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: 'home.html', //生成的html存放路径，相对于 path
            template: TPL_PATH + '/index.html', //html模板路径
            chunks: ["lib", "common", "index"],
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: 'hello.html', //生成的html存放路径，相对于 path
            template: TPL_PATH + '/index.html', //html模板路径
            chunks: ["lib", "common", "hello"],
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ //混合代码插件
            compressor: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([{ //拷贝静态资源从开发目录到打包目录
            from: path.resolve(SRC_PATH, 'common'),
            to: "common",
            toType: 'dir'
        }]),
        //provide $, jQuery and window.jQuery to every script
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
};
