const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 清理 /dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
 /* 
 production模式下，SplitChunksPlugin插件是默认被启用的
 */
module.exports = merge(common, {
  mode: 'production',
  
  optimization: {
    splitChunks: {
      chunks: 'async',  // 针对异步加载的chunk做切割
      minSize: 30000,  // 大于30kb生成chunk，反之不生成
      minChunks: 1, // 共享该module的最小chunk数
      maxAsyncRequests:5, // 最多有5个异步加载请求该module
      maxInitialRequests: 3,
      automaticNameDelimiter: '~', // 名字中间的间隔符
      name: true, // chunk的名字，如果设成true，会根据被提取的chunk自动生成。
      cacheGroups: { // 我们要切割成的每一个新chunk就是一个cache group
        vendors: {
          test:  /[\\/]node_modules[\\/]/, // 用来决定提取哪些module
          priority: -10, // 优先级高的chunk为被优先选择,优先级一样的话，size大的优先被选择
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true //当module未变时，是否可以使用之前的chunk.
        }
      }

    }
  },

  module: {
    rules: [
      { // 编译图片
        test: /\.(png|gif|jpg|jpeg|bmp)$/i, 
        // loader: 'file-loader',
        loader:'url-loader', 
        options: {
          name: 'images/[name].[hash:8].[ext]', 
          limit: 5000,
        } 
      },
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      
      filename: "css/[name].[hash:8].css", // dist的存放路径和打包名称
      chunkFilename: "[id].[hash:8].css",
      cache: true, // 默认false 只有在内容变化时才生成一个新的文件
      inject: true, // 默认true
      hash: true,
      minify: {
        removeComments: true, // 默认false 是否去掉注释
        collapseWhitespace: false, // 默认false 是否去掉空格
        minifyCSS: true, // 默认false 是否压缩html里的js
        minifyJS: true, // 默认false 是否压缩html里的css
        removeScriptTypeAttributes: true, // type="text/javascript"从script标签中删除。其他type属性值保持不变
        removeStyleLinkTypeAttributes: true, // 删除type="text/css"从style和link标签。其他type属性值保持不变 
      },
      xhtml: true, // 默认false 是否以兼容 xhtml 的模式引用文件
    }),

     // 定义全局变量用于过滤 vue发出的错误警告 
    new webpack.DefinePlugin({
	  	'process.env': {
	   		NODE_ENV: '"production"'
	  	}
    }),
    
    // 使用 OptimizeCssAssetsPlugin 压缩 css 样式
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),

    new CleanWebpackPlugin(['dist']),
  ]
});