import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Movie Catalogue</h2>
        </div>
        <Home />
      </div>
    );
  }
}

export default App;
