import React, { Component } from 'react';
import './App.css';
 import SurMap from './Components/Survey';

//import NavbarApp from './Components/Navbar';
class App extends Component {
  render() {
    return (
      <div className="App">
        <SurMap/>
        {/* <NavbarApp/> */}
        
      </div>
    );
  }
}

export default App;
