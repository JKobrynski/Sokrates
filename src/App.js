import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setSession, setCurrentUser } from "./actions/authActions";

import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

import { Provider } from "react-redux";
import store from "./store";

// Sprawdź, czy w localStorage są
// zapisane dane o biezącej sesji
if (localStorage.session) {
  // Jeśli w lcoalStorage są zapisane dane o sesji
  // zapisz je w Reduxie
  store.dispatch(setSession(JSON.parse(localStorage.session)));
}

// Sprawdź czy w localStorage są
// zapisane dane o biezacym uzytkowniku
if (localStorage.user) {
  // Jeśli w localStorage są zapisane dane o uzytkowniku
  // zapisz je w Reduxie
  store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
}

class App extends Component {
  render() {
    return (
      // Zapewnienie wszystkim componentom jednego store
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Homepage} />
            <Route exact path="/register" component={Register} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
