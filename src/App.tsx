import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import Signup from "./views/signup";
import Projects from "./views/projects";
import Settings from "./views/settings";

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
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/projects" component={Projects} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
