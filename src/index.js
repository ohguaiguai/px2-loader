import React from 'react';
import ReactDOM from 'react-dom';
import A from './A';
import B from './B';
import C from './C';
import D from './D';
import E from './E';

class App extends React.Component {
  state = {
    val: '',
  };
  onchange = (el) => {
    this.setState({
      val: el.target.value,
    });
  };
  render() {
    const val = this.state.val;
    // console.log('val', val);
    return (
      <div>
        <A val={val} />
        <B val={val} />
        <C val={val} />
        <D val={val} />
        <E val={val} />
        <input onChange={this.onchange} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
