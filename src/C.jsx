import React from 'react';
const log1 = (component) => {
  return component;
};
const log2 = (component) => {
  return component;
};
class C extends React.Component {
  render() {
    return <div>我是C{this.props.val}</div>;
  }
}
export default log2(log1(C));
