import React, { Component } from "react";
import "./App.css";
// import { CapiClient, UserSignup } from "./rekrClient";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { setSession, setCurrentUser } from "./actions/authActions";

import Register from "./components/Register";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";

import { Provider } from "react-redux";
import store from "./store";

// Check for session
if (localStorage.session) {
  // Set session and is authenticated
  store.dispatch(setSession(JSON.parse(localStorage.session)));
}

// Check for user
if (localStorage.user) {
  // Set user
  store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      userId: ""
    };
  }

  // TODO: Refreshing after adding new note
  // TODO: NotesFeed component

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Register} />
            <div className="container">
              <Route exact path="/home" component={Homepage} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
