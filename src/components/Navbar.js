import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import funkcji wylogującej uzytkownika
import { logoutUser } from "../actions/authActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  // Funkcja obsługująca kliknięcie w przycisk
  onClick() {
    this.props.logoutUser();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          {/* W przypadku gdy uzytkownik jest zalogowany, wyswietlenie jego etykiety,
          gdy nie jest zalogowany wyswietlenie "Sokrates" */}
          {this.props.auth.isAuthenticated && this.props.auth.user.label ? (
            <span className="navbar-brand font-weight-bold">
              {this.props.auth.user.label}
            </span>
          ) : (
            <span className="navbar-brand font-weight-bold">Sokrates</span>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              {/* Wyświetlenie przycisku "Wyloguj" tylko jezeli uzytkownik
              jest zalogowany */}
              {this.props.auth.isAuthenticated ? (
                <button onClick={this.onClick} className="btn btn-primary">
                  <strong>Wyloguj</strong>
                </button>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
