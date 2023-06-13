import React from 'react';
import logo from './logo.svg';
import './App.css';
import packageJson from '../package.json';

function App() {
  const version = packageJson.version;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CACHE BUSTING TEST APP</p>
        <p>Version: {version}</p>
      </header>
    </div>
  );
}

export default App;
