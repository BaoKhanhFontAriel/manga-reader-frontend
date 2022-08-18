import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import NavigationComponent from "./components/NavigationComponent";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import axios from 'axios';
import React, { Component } from 'react';

function App() {
  componentDidMount() {
    axios.get('/api/test')
         .then(result => this.setState({ message: result.data.message }))
  };

  return (
    <div className="App">
       <header className="App-header">
          <h1>{ this.state.message }</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      <HeaderComponent />
      <NavigationComponent />
      <main class="my-4">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
