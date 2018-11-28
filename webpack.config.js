
/*
webpack4 入口和出口0配置
其他的配置包括resolve / module(loaders) / plugins / devServer

modules: { loaders: [{
  test: /\.js$/, //匹配希望处理文件的路径
  exclude: /node_modules/, // 匹配不希望处理文件的路径
  loaders: 'xxx-loader?a=x&b=y' //此处xxx-loader 可以简写成xxx , ？后以query方式传递给loader参数
  },...]}

*/
// 引入开发环境需要的模块
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

var config = {

  
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
      // js 的babel转换
      { test: /\.js$/, exclude: /node_modules/, use: {loader: "babel-loader" }},
      // html 切割
      { test: /\.html$/, use: [{loader: "html-loader",options: { minimize: true }}]},
      //  编译解析vue 
      { test: /.vue$/, loader: 'vue-loader' },
      // 编译 css 并提取css 
      { test: /\.css$/, use: [ MiniCssExtractPlugin.loader,'css-loader']},
      // 编译 scss
      { test: /\.scss$/,  loader: ['style-loader', 'css-loader','sass-loader' ]},
      // 编译图片
      { test: /\.(png|gif|jpg|jpeg|bmp)$/i, loader:'url-loader', options: {name: 'images/[name].[hash:8].[ext]', limit: 5000} },
      // 编译字体文件
      { test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i, loader:'url-loader?limit=5000'} 
      
    ]
  },

  plugins: [
    // html 分离  (index.html是一级入口，自动注入)
    new HtmlWebPackPlugin({
      template: __dirname + '/src/index.html', // 引用的文件
     // filename: "./index.html"
    }),
    // css 打包分离 MiniCssExtract 仅支持webpack4.2.0以上版本
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css", // dist的存放路径和打包名称
      chunkFilename: "[id].[hash:8].css"
    }),
    // 使用 HotModuleReplacementPlugin 插件 实时编译和刷新浏览器
  new webpack.HotModuleReplacementPlugin(),
    // 插件配置vue-loader
  new VueLoaderPlugin(),
  ],

  devServer: {
  port: 8080,
  contentBase: __dirname,
  inline: true,
  hot: true,
  }
}

module.exports= config