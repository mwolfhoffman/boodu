import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import Signup from "./views/signup";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
