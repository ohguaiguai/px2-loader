- 浏览器默认的根 fontSize 是 16px
- px2rem-loader 需要和 flexible 配合使用; vw 可以单独使用
- 使用自定义 loader 的方法有三种

  1. 使用别名

  ```js
    const px2remLoaderPath = path.resolve(__dirname, 'loaders/my-px2rem-loader.js');

    resolveLoader: {
    alias: {
      'px2rem-loader': px2remLoaderPath,
    }
  },
  ```

  2. 配置 modules

  ```js
   resolveLoader: {
    modules: ['loaders', 'node_modules']
  },
  ```

  3. 使用绝对路径

  ```js
  {
          loader: path.resolve(__dirname, 'loaders/px2rem-loader.js'),
          options: {
            remUnit: 75,
            remPrecision: 8, // 保留8位小数
          },
        },
  ```

- 官方 px2rem-loader 对于第三方的样式也会做 rem 转化，导致样式出问题, 解决办法:

  1. 自己写一个 loader
  2. 针对该 css 单独写一套规则
  3. 对需要转换的 css 使用行内 loader， webpack 中不使用 px2rem-loader

  ```js
  import 'px2rem-loader!./index.css'; // 实际使用的时候报错了
  ```
