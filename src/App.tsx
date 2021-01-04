import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Start from "./pages/Start/Start";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Start />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
