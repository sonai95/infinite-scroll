import logo from './logo.svg';
import './App.css';
import UsersList from './Components/UsersList';
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import userContext from './Utils/UserContext'

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/home" element={<UsersList />} />
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
