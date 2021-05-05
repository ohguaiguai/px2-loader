let Px2vw = require('../lib/px2vw');
// 只要安装了 webpack 就得到这个模块
let loaderUtils = require('loader-utils');

function loader(source, ast) {
  let options = loaderUtils.getOptions(this);
  // this.resource 当前正在转换的模块的绝对路径
  if (options.exclude && options.exclude.test(this.resource)) {
    return source; // 不转换，直接返回
  }
  let px2vw = new Px2vw(options);
  //   console.log(source);
  let target = px2vw.generateVw(source);
  //   console.log(target);
  return target;
}

module.exports = loader;
