/*
modules中test: /\.js$/, //匹配希望处理文件的路径， ？是参数简写，也可以 以query方式传递给loader参数
webpack.common.js === webpack.config.js
通过merge插件可以使common和各个环境搭配起来，不会造成DRY(重复写配置)

CommonsChunkPlugin 已经从 webpack v4（代号 legato）中移除,最新的是SplitChunksPlugin
pord模式自动开启
*/

// 引入开发环境需要的模块
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin")
var OpenBrowserPlugin = require('open-browser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') 

// webpack4 入口和出口可以0配置
// 基础配置包括resolve / module(loaders) / plugins / devServer
var config = { 
  output: {
    // 将输出的文件都放在dist目录下， 自定义配置按需加载放在chunk下
  path: path.resolve(__dirname, 'dist'),
  chunkFilename: 'chunks/[name].chunk.js', 
  },

  resolve: {
    // 文件解析 + 别名
    extensions: ['*', '.scss', '.js', '.vue'], 
	  alias: { 
    '@': __dirname + '/src',
    vue: 'vue/dist/vue.js' // 不写会报错You are using the runtime-only build of Vue 
	  }
  },
  
  module: {   
    rules: [
      { // js 的babel转换
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {loader: "babel-loader" },
      },
      
      { // html 切割
        test: /\.html$/, 
        use: [{
          loader: "html-loader",
        options: { minimize: true }
        }]},

      { //  编译解析vue ,dev module增加option提取css
        test: /.vue$/, 
        loader: 'vue-loader',
        options: {
          extractCSS: true
        } 
      }, 
  
      { // 若编译 sass  test为.sass 
        test: /\.scss$/,  
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // 编译sass需要indentedSyntax
            /* options: {
              indentedSyntax: true
            }, */
          },
          { // 相对路径加载一个全局设置文件，避免每次都在style中引入相关的css文件
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/common/style/variable.scss', './src/common/style/mixin.scss',]
            }
          }
        ]
      },
      
      { // 编译图片
        test: /\.(png|gif|jpg|jpeg|bmp)$/i, 
        // loader: 'file-loader',
        loader:'url-loader', 
        options: {
          name: 'images/[name].[hash:8].[ext]', 
          limit: 5000,
        } 
      },

      { // 编译字体文件
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i, 
        loader:'url-loader',
        options: {
          name: 'fonts/[name].[hash:8].[ext]', 
          limit: 8000
        }
      } 
    ]
  },

  plugins: [
    // html 分离  (index.html是一级入口，自动注入)
    new HtmlWebPackPlugin({
      template: __dirname + '/src/index.html', // 引用的文件
       
    }),

    new OpenBrowserPlugin({
      //url: 'http://172.20.10.2:8080'
        url: 'http://localhost:8080'
    }),

    // 使用 HotModuleReplacementPlugin 插件 实时编译和刷新浏览器
    new webpack.HotModuleReplacementPlugin(),

    // 插件配置vue-loader 15版本以上需要的
    new VueLoaderPlugin(), 

    

    // 定义全局变量用于生产环境和开发环境的调优
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ],

  devServer: {
  port: 8080,
  contentBase: __dirname,
  inline: true,
  hot: true,
  // host: '0.0.0.0', // 加了这个，才能使用ip指代网址
  }
}

module.exports= config