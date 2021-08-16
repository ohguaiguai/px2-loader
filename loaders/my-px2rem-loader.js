/**
 * loader 的本质是一个函数，参数是上一个 loader 的内容或者是模块源代码(当写在最下面)
 * 经过一些处理，把结果返回给下一个 loader 或者 webpack
 */

let Px2rem = require('../lib/px2rem');
// 只要安装了 webpack 就得到这个模块
let loaderUtils = require('loader-utils');

function loader(source, ast) {
  // 通过 getOptions 可以获取到用户在 webpack.config.js 中配置的参数对象  { remUnit: 75, remPrecision: 8}
  let options = loaderUtils.getOptions(this);
  
  // this.resource 当前正在转换的模块的绝对路径
  
  let goon = false;

  if (options.exclude && options.exclude.test(this.resource)) {
    goon = false;
  }
  // include 优先级大于exclude
  if (options.include && options.include.test(this.resource)) {
    goon = true;
  }

  if (!goon) {
    return source;
  }
  
  let px2rem = new Px2rem(options);
  //   console.log(source);
  let target = px2rem.generateRem(source);
  //   console.log(target);
  return target;
}

module.exports = loader;

// let source = `
// #root {
//     width: 750px;
// height: 750px;
// }
// `;

// loader(source);
