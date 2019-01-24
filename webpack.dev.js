// merge模块引入common.js，构建开发环境所需要的配置
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const axios = require ('axios')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// merge
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // source-map
  module: {
    rules: [
      { // 编译 css 并提取css (只在生产环境使用css提取，便于开发环境下的热重载)
        /*  use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader'
        ]  */
        test: /\.css$/, 
        // exclude: /(node_modules|bower_components)/,
        use: [  // 应用到
          MiniCssExtractPlugin.loader,
         { // loader加载的顺序很重要
          loader: 'style-loader', 
          loader: 'css-loader',
          /* options: {
             modules: true //开启 CSS Modules
          } */
        }]
      },

    ]
  },

  plugins: [
    // css 打包分离 MiniCssExtract 仅支持webpack4.2.0以上版本
    new MiniCssExtractPlugin({
      
      filename: "css/[name].[hash:8].css", // dist的存放路径和打包名称
      chunkFilename: "[id].[hash:8].css",
      cache: true, // 默认false 只有在内容变化时才生成一个新的文件
      inject: true, // 默认true
      hash: false,
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
  ],

  devServer: {
    contentBase: './dist',
   /*  由于请求的referer和host不同，所以前端不能拿到数据，需要后端做一个代理
    后端向有数据的服务端发送请求，拿到数据，然后前端在向自己的服务器请求数据
    使用axios实现ajax请求：axios是一个基于promise的HTTP库，可以用于浏览器和node.js
    在浏览器创建XMLHttpRequest对象，从node.js创建http请求 */
    before(app) {
   /* old api:   app.get('/api/getDiscList', (req, res) => {
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
       // 这里的路径是给前端发送请求的url,axios发送get请求，可以自己配置config
        axios.get(url, {
            headers: {
              // 伪造referer，直接打开上面的url会失效 
            'referer': 'https://c.y.qq.com/',
            'host': 'c.y.qq.com',
            'content-type': 'application/x-www-form-urlencoded'
          }, 
          //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
          params: req.query
        }).then((response) => {
          res.json(response.data)  //返回数据
          // console.log(response.data)
        }).catch((error) => {
          console.log(error)
        })
      }) */

      //在node层做转发层 获取歌单的所有曲目，用axios获取 ,注释这个是用了新的api
 /*      app.get('/api/getSongList', (req, res) => {
        let url ='https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        axios.get(url, {
          headers: {
            'referer': 'https://c.y.qq.com/',
            'host': 'c.y.qq.com',
            'content-type': 'application/x-www-form-urlencoded'
          },
          params: req.query
        }).then((response) => {
          if (typeof response.data  === 'String') {
            var reg = /{.*}/
            var matches = response.data.match(reg)
            if (matches) {
              response.data = JSON.parse(matches[0])
            }
          }
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }) */
      // 获取歌词 在
      app.get('/api/getlyric', (req, res) => { // 用地址可以找到匹配的，注意地址要小写
        let url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg` 
        axios.get(url, {
          headers: {
            'referer': 'https://c.y.qq.com/',
            'host': 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          var ret = response.data
          if (typeof ret === 'string' ) {
            // 用于匹配 MusicJsonCallback({"retcode":0,....
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg) //  match() 方法可在字符串内检索指定的值
            if ( matches ) {
              // console.log('hahahh    ' + matches) // 触发之后会在vscode的终端显示
              // console.log(matches[0])
              // console.log(matches[1])
              ret = JSON.parse(matches[1])
            }
          }
          res.json(ret)
        }).catch((e) => {
          console.log(e)
        })
      })
    },
  }
});