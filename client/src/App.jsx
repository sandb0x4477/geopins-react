import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';

import './App.css';
import Header from './components/Header';
// import MapTemp from './components/MapTemp';
import MapUrbica from './components/MapUrbica';
import Blog from './components/Blog';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <MapUrbica />
        <Blog />
      </>
    );
  }
}

export default App;
