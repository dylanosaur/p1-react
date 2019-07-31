import React from 'react';
import logo from './logo.svg';
import ContentContainer from './components/content-container'
import './include/bootstrap'
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={require('./rev-logo.png')} id="logo"/>
      </header>
      <ContentContainer />
    </div>
  );
}

export default App;
