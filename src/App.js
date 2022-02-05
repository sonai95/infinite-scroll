import "./App.module.css";
import UsersList from "./Components/UsersList";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import userContext from "./Utils/UserContext";
import { ErrorHandle } from "./Components/ErrorHandle";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ErrorHandle>
                  <Login />
                </ErrorHandle>
              }
            />
            <Route
              path="/home"
              element={
                <ErrorHandle>
                  <UsersList />
                </ErrorHandle>
              }
            />
          </Routes>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
