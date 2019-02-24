import React, { Component } from 'react';
import './App.css';
import CreateStarship from './components/CreateStarship';
import Starships from './components/Starships';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Starships For Sale </h1>
        <p>
          No matter whats your side on the force, we sell you the starship of
          your dreams.
        </p>
        <Starships />
        <p>Do you have a starship to sell?</p>
        <CreateStarship />
      </div>
    );
  }
}

export default App;
