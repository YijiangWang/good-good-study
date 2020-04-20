#### 一.初识webpack
- 从4.0版本开始,webpack和webpack-cli是两个分开的模块,需要分别安装:`npm install webpack webpack-cli --save-dev`;
- 模块局部安装会在 node_modules/.bin 目录下创建软链接,如 node_modules/.bin/webpack;在package.json文件中可以直接获取到这些软链接.

#### 二.webpack的基本使用
###### 2.1.entry和output的使用
- 单入口(一般是单页应用)
```js
module.exports = {
  entry: './path/myEntry/file.js',
  output: {
    path: __dirname+'/dist',
    filename: 'bundle.js'
  }
}
```
- 多入口(一般是多页应用)
```js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'       // 通过占位符确保文件名的唯一:文件名与entry中的key一一对应.
  }
}
```

###### 2.2.loaders
- webpack开箱即用只支持js和json两种文件类型,通过loaders去支持其它文件类型,并且把它们转化成有效的模块,并且可以添加到依赖图中;
- loaders本身是一个函数,接收源文件作为参数,返回转换的结果;
- 常见的loaders:
  |名称|描述|
  |:--:|:--:|
  |babel-loader|转换ES6,ES7等js新特性语法|
  |css-loader|支持css文件的加载和解析|
  |less-loader|将less文件转换成css|
  |ts-loader|将ts转换成js|
  |file-loader|进行图片/字体等的打包|
  |raw-loader|将文件以字符串的形式导入|
  |thread-loader|多进程打包js和css,加快打包速度|
- loaders的使用
```js
const path = require('path');
module.exports = {
  entry: {
    app: './src/app.js',
    login: './src/login.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  module: {
    // loaders放在module下的rules中,test指定匹配规则,use指定使用的loader名称
    rules:[
      {test: /\.txt$/, use: 'raw-loader'}
    ]
  }
}
```

###### 2.3.plugins
- 插件用于bundle文件的优化/资源管理/环境变量注入;
- 作用于整个构建过程(可以认为任何loaders不能完成的事情都可以通过plugins来完成).
- 常见的plugins,这里只列举部分常用的,还有其的很多
  |名称|描述|
  |:-:|:-:|
  |CommonsChunkPlugin|将chunks相同的模块代码提取成公共js|
  |CleanWebpackPlugin|清理构建目录|
  |ExtractTextWebpackPlugin|将css从bundle文件里提取成一个独立的css文件|
  |CopyWebpackPlugin|将文件/文件夹拷贝到构建的输出目录|
  |HtmlWebpackPlugin|创建html文件去承载输出的bundle|
  |UglifyjsWebpackPlugin|压缩js|
  |ZipWebpackPlugin|将打包出的资源生成一个zip包|
- plugins用法：
  ```js
  const path = require('path');

  console.log('yjw---> ', path.resolve(__dirname, 'dist'))
  module.exports = {
    entry: {
      app: './path/myEntry/app.js',
      login: './path/myEntry/login.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    mode: 'production',
    module: {
      rules: [
        {test: /\.txt$/, use: 'raw-loader'}
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: './src/index.html'})
    ]
  }
  ```
###### 2.4.mode
- mode是webpack4提出来的一个新概念，用来指定当前的构建环境：production、development和none；
- 设置mode可以使用webpack内置的函数，默认值为production。
- mode的内置函数功能：
  |选项|描述|
  |:-:|:-:|
  |development|设置process.env.NODE_ENV的值为development，webpack默认开启`NamedChunksPlugin`和`NamedModulesPlugin`。|
  |production|设置process.env.NODE_ENV的值为production，webpack默认开启`FlagDependencyUsagePlugin`、`FlagIncludedChunksPlugin`、`ModuleConcatenationPlugin`、`NoEmitOnErrorsPlugin`、`OccurrenceOrderPlugin`、`SideEffectsFlagPlugin`和`TerserPlugin`|
  |none|不开启任何优化选项|
- mode使用：
  ```js
  const path = require('path');
  module.exports = {
    entry: {
      app: './src/myEntry/app.js',
      login: './src/myEntry/login.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    mode: 'development',
    module: {
      rules: [
        {test: /\.txt$/, use: 'raw-loader'}
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: './src/index.html'})
    ]
  };
  ```

###### 2.5.解析es6和React
- webpack.config.js中的内容：
  ```js
  const path = require('path');
  module.exports = {
    entry: {
      es6: './src/es6.js',
      react: './src/react.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js$/, 
          use: "babel-loader",
          exclude: /node_modules/
        }
      ]
    }
  }
  ```
  - 如果把上面的 `test: /\.js$/` 写成 `test: "/\.js$/"`，则会报如下的错：*Module parse failed: Unexpected token XXX. You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.*
- 这里用到了 *babel-loader*，需要进行安装 *babel-loader、@babel/core、@babel/preset-env、@babel/preset-react*，创建`.bablerc`或者`babel.config.js`文件，内容如下：
  ```js
  {
    "presets": [
      "@babel/preset-env",  // 编译es6
      "@babel/preset-react" // 编译react
    ]
  }
  ```
- 注意，在dist中创建一个html文件，然后引入编译之后的es6和react的代码，下面两行代码的顺序一定不能颠倒，否则会报错：*Uncaught Error: Target container is not a DOM element.*
  ```html
  <div id="root"></div>
  <script src="./react.js"></script>
  ```

###### 2.6.解析css、less和sass
- css-loader：用于加载 *.css* 文件，并且转换成 *commonjs* 对象；
- style-loader：将样式通过 *style* 标签插入到 *head* 中。
- 安装 *webpack、webpack-cli、react react-dom、babel-loader、style-loader、css-loader，@babel/core、@babel/preset-env、@babel/preset-react*;
- webpack.config.js 文件内容如下：
  ```js
  const path = require('path');

  module.exports = {
    entry: {
      app: "./src/app.js"
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "[name].js"
    },
    mode: "development",
    module: {
      rules: [
        {test: /\.js$/, use: "babel-loader"},
        {test: /\.css$/, use: ["style-loader", "css-loader"]}
      ]
    }
  }
  ```
  - 注：*["style-loader", "css-loader"]* 这里的顺序是从右往左执行的，先解析css，然后再讲css添加到style中，所以顺序不要颠倒。
- babel.config.js 文件内容：
  ```js
  module.exports = {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
  ```
- 解析 less：
  - 在 *rules* 中添加配置：
    ```js
    {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]}
    ```
    - 注：同理，上面三个 *loader*  的顺序不能颠倒。
  - 安装 *less、less-loader*。

###### 2.7.资源解析
- 解析图片 *png/svg/jpg/gif* 和字体 *woff/woff2/eot/ttf/otf*,需要使用 *file-loader*:
  ```js
  // @ts-check
  const path = require('path');

  module.exports = {
    entry: {
      app: "./src/app.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js"
    },
    mode: "production",
    module: {
      rules: [
        {test: /\.js$/, use: "babel-loader"},
        {test: /\.(jpg|jpeg|gif|png|svg)/i, use: "file-loader"},
        {test: /\.(woff|woff2|eot|ttf|otf)$/, use: "file-loader"}, // 字体解析
        {test: /\.(jpg|jpeg|gif|png|svg)/i, use: [
          {loader: "url-loader", options: {limit: 10240}} // 10k,资源小于10k时,转为base64
        ]}
      ]
    }
  }
  ```
- 除了 *file-loader*,还可以使用 *url-loader* 来解析图片和字体,*url-loader* 比 *file-loader* 多一个功能,可以通过 *option* 设置将较小的资源自动转换成 base64.
  
###### 2.8.webpack中的文件监听
- 文件监听是指发现源码发生变化时,自动重新构建出新的输出文件;
- webpack 开启监听模式有两种方式:
  - 启动webpack命令时,带上 *--watch* 参数:
    ```js
    "build": "webpack --watch"
    ```
  - 在配置 webpack.config.js 中设置 *watch: true*:
    ```js
    // @ts-check
    const path = require('path');
    module.exports = {
      entry: {
        app: './src/app.js'
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
      },
      mode: 'development',
      watch: true,
      module: {
        rules: [
          {test: /\.js$/, use: 'babel-loader'}
        ]
      }
    }
    ```
- 文件监听原理
  - 轮询判断文件的最后编辑时间是否发生变化;
  - 某个文件发生了变化,并不会立刻告诉监听者,而是先缓存起来,等待 aggregateTimeout 时间后再去执行:
    ```js
    module.exports = {
      // 默认是 false,也就是不开启
      watch: true,
      // 只有开启监听模式时,watchOptions 才有意义
      watchOptions: {
        // 默认为空,不监听的文件或者文件夹,支持正则匹配
        ignored: /node_modules/,
        // 监听到文件变化后等 300ms 再去执行,默认 300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停轮询系统指定文件有没有变化实现的,默认每秒轮询 1000 次
        poll: 1000
      }
    }
    ```
###### 2.9.热更新:webpack-dev-server
- WDS:
  - WDS 不刷新浏览器;
  - WDS 不输出文件,而是放在内存中(速度更快);
  - 配合 HotModuleReplacementPlugin 插件使用.
  - 在 package.json 添加一句执行命令语句: *"dev": "webpack-dev-server --open"*, *--open* 是命令执行完之后自动打开浏览器的意思.
  - webpack.config.js 文件中的内容:
    ```js
    const path = require('path');
    const webpack = require('webpack');

    module.exports = {
      entry: {
        app: './src/app.js'
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
      },
      mode: 'development',
      module: {
        rules: [
          {test: /\.js$/, use: 'babel-loader'}
        ]
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ],
      devServer: {
        contentBase: './dist',
        hot: true,
        port: 8383  //可以设置端口,默认8080
      }
    }
    ```
- 热更新: 使用 webpack-dev-middleware
  - WDM 将 webpack 输出的文件传输给服务器;
  - 适用于灵活的定制场景;
  - 以下代码没有验证,感兴趣的你可以尝试:
    ```js
    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    const app = express();
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler,{pubilcPath: config.output.publicPath}));
    app.listen(3000,function(){
      console.log('Example app listening on port 3000\n');
    })
    ```
  - 原理稍后补充.

###### 2.10.文件指纹
- 文件指纹: 打包后输出的文件名的后缀;
- 通常用于版本管理: 文件修改后,其文件指纹会发生改变,这时浏览器会从服务器重新下载,而不去读缓存中的文件.
- 文件指纹生成方式:
  - Hash: 和整个项目的构建相关,只要项目文件有修改,整个项目构建的 hash 值就会改变,一个文件修改,所有页面的hash都会改变;
  - Chunkhash: 和 webpack 打包的 chunk 有关,不同的 entry 会生成不同的 chunkhash 值,一个entry文件的修改不会影响到其他entry的文件,一般的js文件会使用 Chunkhash;
  - ContentHash: 根据文件内容来定义 hash,文件内容不变,则 contenthash 不变,一般css文件使用. 
- js 文件指纹设置,一般只需要设置 output 中的 filename:
  ```js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  ```
  - 其中生成的hash有32位,这里取前面的8位.
- css 文件指纹的设置,需要修改两个地方:一个是module下面的rules;一个是增加plugins下面的 MiniCssExtractPlugin 插件,设置 MiniCssExtractPlugin 的 filename,使用 *[contenthash]*.这里 MiniCssExtractPlugin 和 style-css 互斥.:
  ```js
  module: {
    rules: [
      {test: /\.css$/, use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
  ]
  ```
- webpack.config.js 文件内容如下:
  ```js
  const path = require('path');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');

  module.exports = {
    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]_[chunkhash].js' // js文件指纹的设置
    },
    mode: 'production',
    module: {
      rules: [
        {test: /\.js$/, use: 'babel-loader'},
        {test: /\.css$/, use: [
          MiniCssExtractPlugin.loader,  // css文件指纹设置的第一个地方
          'css-loader'
        ]},
        {test: /\.(jpg|jpeg|png|svg|gif)$/, use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]' // 图片文件的指纹设置
            }
          }
        ]}
      ]
    },
    plugins:[
      // css 文件指纹设置的第二个地方
      new MiniCssExtractPlugin({
        filename: '[name]_[contenthash:8].css'
      })
    ]
  }
  ```
- 图片[字体]的文件指纹设置:
  - 设置 *file-loader* 或者 *url-loader* 的 *options* 里面的 name,使用 *[hash]*
  ```js
  module: {
    entry: {
      ...
    },
    output: {
      ...
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'img/[name][hash:8].[ext]'
            }
          }]
        }
      ]
    }
  }
  ```
    |占位符名称|含义|
    |:-:|:-:|
    |[ext]|资源后缀名|
    |[name]|文件名称|
    |[path]|文件的相对路径|
    |[folder]|文件所在的文件夹|
    |[contenthash]|文件的内容hash,默认是md5生成|
    |[hash]|文件内容的hash,默认是md5生成|
    |[emoji]|一个随机的指代文件内容的emoji|

###### 2.11.代码压缩
- js文件的压缩
  - webpack4 内置了 uglifyjs-webpack-plugin,如果mode是production,默认就会压缩js代码.当然也可以手动安装,然后设置一些额外的参数.
- css文件的压缩
  - css-loader1.0时,可以设置minify这个参数进行压缩,但是1.0之后这个参数被取消了.
  - 使用 optimize-css-assets-webpack-plugin;
  - 需要同时配合 cssnano 预处理器使用.
  ```js
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ]
  ```
- html文件压缩
  - 使用html-webpack-plugin,设置压缩参数
  ```js
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/app.html),
      filename: 'app.html',
      chunks: ['app'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        nimifyJS: true,
        removeComments: false
      }
    })
  ]
  ```
- webpack.config.js 文件内容如下:
  ```js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

  module.exports = {
    entry: {
      app: './src/app.js',
      login: './src/login.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
      rules: [
        {test: /\.js$/, use: 'babel-loader'},
        {test: /\.css$/, use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]}
      ]
    },
    plugins:[
      new MiniCssExtractPlugin({
        filename: '[name]_[contenthash:8].css'
      }),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/app.html'),
        filename: 'app.html', //打包出来之后的文件名称
        chunks: ['app'],  // 生成的html文件需要使用哪些chunk
        inject: true, // chunk会自动注入到html文件中
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          nimifyJS: true,
          removeComments: false
        }
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/login.html'),
        filename: 'heihei.html',
        chunks: ['login'],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    ]
  }
  ```
- 这里展示一下 package.json 文件内容,本章节(第二章)中的 package.json 中内容大部分是一样的:
  ```json
  {
    "name": "11-code-compress",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "@babel/core": "^7.9.0",
      "@babel/preset-env": "^7.9.5",
      "@babel/preset-react": "^7.9.4",
      "babel-loader": "^8.1.0",
      "css-loader": "^3.5.2",
      "cssnano": "^4.1.10",
      "html-webpack-plugin": "^4.2.0",
      "mini-css-extract-plugin": "^0.9.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "react": "^16.13.1",
      "react-dom": "^16.13.1",
      "webpack": "^4.42.1",
      "webpack-cli": "^3.3.11"
    }
  }
  ```