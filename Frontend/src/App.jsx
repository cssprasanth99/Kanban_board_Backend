import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
