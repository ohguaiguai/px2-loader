import React from 'react';
import ReactDOM from 'react-dom';
import 'amfe-flexible'; // 用来设置根 font-size

import './index.css';

import 'antd/dist/antd.css';
import { Button } from 'antd';

// ReactDOM.render('我是一个按钮', document.getElementById('root'));

ReactDOM.render(<Button>我是一个按钮</Button>, document.getElementById('root'));
