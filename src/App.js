import React, { Component } from 'react';
import './App.css';
import MoviesList from './components/MoviesList.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Movie Catalogue</h2>
        </div>
        <MoviesList />
      </div>
    );
  }
}

export default App;
