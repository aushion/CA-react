var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var glob = require('glob');
var view = require('./profile.js');

var TPL_PATH = path.resolve(__dirname, 'src/template'); //html模板路径
var LIB_PATH = path.resolve(__dirname, 'node_modules'); //项目依赖模块路径
var SRC_PATH = path.resolve(__dirname, 'src'); //项目开发路径
var BUILD_PATH = path.resolve(__dirname, 'build'); //项目打包输出路径

var entries = getEntry('src/page/**/*.jsx', 'src/page');//多页面入口配置，通过getEntry获取
var chunks = Object.keys(entries);//获取入口的键名
var views = view.view; //获取外部配置

var config = {
    entry: entries,
    resolve: {
        extensions: ['', 'jsx', '.js'] //配置该项,可设置忽略js、jsx等指定的后缀
    },
    output: {
        path: BUILD_PATH,//打包输出目录
        filename: 'js/[name].bundle.js',//输出文件名
        chunkFilename: "js/[id].chunk.js?[chunkhash]",
        sourceMapFilename: '[name].map',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,        //解析jsx,js等
            exclude: [LIB_PATH],   //排除node_modules目录，加快打包速度
            include: [SRC_PATH],
            loader: 'babel'
        }, {
            test: /\.css$/,
            exclude: [LIB_PATH],
            include: [SRC_PATH],
            loader:ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        }, {
            test: /\.scss$/,
            exclude: [LIB_PATH],
            include: [SRC_PATH],
            loader:'style!css!sass?sourceMap'
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
        new webpack.ProvidePlugin({ //加载jq
            $: 'jquery'
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        new ExtractTextPlugin('css/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
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
        }])
    ]
};

chunks.forEach(function (entryName) {
    for (var i = 0; i < views.length; i++) {
        if (views[i].page == entryName) {
            var conf = {
                title: views[i].title,
                filename: views[i].filename + '.html', //生成的html存放路径，相对于path
                template: 'src/template/' + views[i].template + '.html', //html模板路径
                inject: false,    //js插入的位置，true/'head'/'body'/false
                /*
                 * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
                 * 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
                 * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
                 * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
                 */
                hash: true, //为静态资源生成hash值
                minify: { //压缩HTML文件
                    removeComments: true, //移除HTML中的注释
                    collapseWhitespace: false //删除空白符与换行符
                }
            };
        }
        // else{
        //     var conf = {
        //         filename: entryname + '.html', //生成的html存放路径，相对于path
        //         template: 'src/template/index.html', //html模板路径
        //         inject: true    //js插入的位置，true/'head'/'body'/false
        //     };
        // }
    }
    if (entryName in config.entry) {
        conf.inject = 'body';
        conf.chunks = ['vendors', entryName];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));

});
module.exports = config;

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname, entryname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry); //获取文件夹名
        extname = path.extname(entry); //获取文件后缀
        basename = path.basename(entry, extname); //获取对应文件类型的文件
        pathname = path.join(dirname, basename);
        entryname = pathname.split(path.sep)[2];
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[entryname] = ['./' + entry];
    }
    return entries;
}
