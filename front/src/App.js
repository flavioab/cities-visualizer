import React, { Component } from 'react';
import Search from './components/search';
import Table from './components/table';
import 'purecss/build/pure-min.css';

class App extends Component {
  render() {
    return (
        <div style={{textAlign: 'center'}}>
            <h2>Cities by Country</h2>
            <Search/>
            <Table/>
        </div>
    );
  }
}

export default App;
