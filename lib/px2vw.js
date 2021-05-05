var css = require('css');
var pxRegExp = /\b(\d+(\.\d+)?)px\b/;
// console.log(pxRegExp.source);
var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');
class Px2vw {
  constructor(config) {
    this.config = config;
  }
  generateVw(cssText) {
    let self = this;
    function processRules(rules) {
      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        // console.log(rule);
        var declarations = rule.declarations;
        for (var j = 0; j < declarations.length; j++) {
          var declaration = declarations[j];
          if (
            declaration.type === 'declaration' &&
            pxRegExp.test(declaration.value)
          ) {
            declaration.value = self._getCalcValue('vw', declaration.value);
          }
        }
      }
    }
    // 得到语法树
    var astObj = css.parse(cssText);
    // console.log(JSON.stringify(astObj.stylesheet.rules, null, 2));
    // 得到新的语法树
    processRules(
      astObj.stylesheet.rules.filter((item) => item.type === 'rule') // 排除 comment
    );
    return css.stringify(astObj);
  }
  _getCalcValue(type, value) {
    var { vwPrecision } = this.config;
    return value.replace(pxGlobalRegExp, (_, $1) => {
      //   console.log(_, $1);
      //   console.log($1, remUnit);
      //  100vw = 750px 1vw = 7.5px
      let val = parseFloat($1 / 7.5).toFixed(vwPrecision);
      return val + type;
    });
  }
}
module.exports = Px2vw;
