const css = require('css');
const loaderUtils = require('loader-utils');

const pxRegExp = /\b(\d+(\.\d+)?)px\b/; // 区分大小写
const pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');

class Px2rem {
  constructor(config) {
    this.config = config;
  }
  generateRem(cssText) {
    const self = this;
    function processRules(rules) {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const declarations = rule.declarations;
        for (let j = 0; j < declarations.length; j++) {
          const declaration = declarations[j];
          if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
            const nextDeclaration = declarations[j + 1];

            if (
              (nextDeclaration &&
                nextDeclaration.type === 'comment' &&
                nextDeclaration.comment.trim() === 'no') ||
              self.config.excludeProperties.includes(declaration.property)
            ) {
              // 如果紧邻的下一个declaration是 /*no*/, 那么就不转为rem
              // 如果属性被忽略转译, 那么就不转为rem
            } else {
              declaration.value = self._getCalcValue('rem', declaration.value);
            }
          }
        }
      }
    }
    const astObj = css.parse(cssText);
    processRules(astObj.stylesheet.rules.filter(item => item.type === 'rule'));
    return css.stringify(astObj);
  }
  _getCalcValue(type, value) {
    const { remUnit, remPrecision } = this.config;
    return value.replace(pxGlobalRegExp, (_, $1) => {
      const val = parseFloat($1 / remUnit).toFixed(remPrecision);
      return val + type;
    });
  }
}
module.exports = Px2rem;
// const css = require('css');
// var ast = css.parse(`body { font-size: 12px;/* no */
//    color: red; }`);
// console.log(JSON.stringify(ast, null, 2));

