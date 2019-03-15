import React, { Component } from 'react';

import './App.css';
import Header from './components/Header';
// import MapTemp from './components/MapTemp';
import MapUrbica from './components/MapUrbica';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <MapUrbica />
      </>
    );
  }
}

export default App;
