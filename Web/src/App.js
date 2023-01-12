import React, { Component } from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import UsersList from "./Pages/Users/UsersList";
import Maps from "./Pages/Maps/Maps"
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: [],
    }
  }

  handleUpdateLocation = (places) => {
    this.setState({ location: places});
  }

  render() {
  return (
    <div className="App">
      <header>
        <BrowserRouter >
        <Routes>
          <Route path="/" element={<UsersList handleUpdateLocation={this.handleUpdateLocation}/>} />
          <Route path="/mapview" element={<Maps location={this.state.location}/>} />
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
  }
}

export default App;
