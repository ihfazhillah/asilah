import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="section">
        <div className="status-list">
          <div className="api">
            <div className="label">API</div>
            <div className="bar"><progress className="progress is-success" value="99" max="100">99%</progress></div>
            <div className="amount has-text-centered">99%</div>
          </div>
          <hr/>
          <div className="lib">
            <div className="label">library.js</div>
            <div className="bar"><progress className="progress is-success" value="99" max="100">99%</progress></div>
            <div className="amount has-text-centered">99%</div>
          </div>
          <hr/>
          <div className="website">
            <div className="label">website</div>
            <div className="bar"><progress className="progress is-success" value="100" max="100">100%</progress></div>
            <div className="amount has-text-centered">100%</div>
          </div>
          <hr/>
          <div className="website">
            <div className="label">something hacky</div>
            <div className="bar"><progress className="progress is-warning" value="40" max="100">40%</progress></div>
            <div className="amount has-text-centered">40%</div>
          </div>
          <hr/>
          <div className="website">
            <div className="label">something unreliable</div>
            <div className="bar"><progress className="progress is-danger" value="14" max="100">14%</progress></div>
            <div className="amount has-text-centered">14%</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
