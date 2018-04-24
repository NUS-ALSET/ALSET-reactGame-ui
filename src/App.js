import React, { Component } from 'react';

import Layout from './components/layout';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default App;
