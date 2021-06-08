import React, { Component } from 'react';

const log1 = (component) => {
  return component;
};
const log2 = (component) => {
  return component;
};

const E = (props, state) => {
  return (
    <div>
      我是E
      {props.val}
    </div>
  );
};
export default log1(log2(E));
