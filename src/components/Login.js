import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import komponentu pola tekstowego
import TextFieldGroup from "./common/TextFieldGroup";

// Import funkcji
import { createSession, logoutUser } from "../actions/authActions";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Nasłuchiwanie błędów
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    // Przeniesienie uzytkownika na strone domowa
    // gdy uzyska autoryzacje(zaloguje sie)
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillMount() {
    // Wylogowanie uzytkownika w przypadku "cofniecia sie"
    // na strone startowa
    if (this.props.auth.isAuthenticated) {
      this.props.logoutUser();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.createSession(user.email, user.password);
  }

  onRegisterClick(e) {
    this.props.history.push("/register");
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center mb-3">Login</h1>
                <form onSubmit={this.onSubmit}>
                  {errors.length > 0 ? (
                    <div className="alert alert-danger mt-3 mb-3">{errors}</div>
                  ) : null}
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    placeholder="Hasło"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Zatwierdź"
                    className="btn btn-info btn-block mt-4 font-weight-bold"
                  />
                </form>
                <input
                  type="button"
                  value="Nie mam jeszcze konta"
                  onClick={this.onRegisterClick.bind(this)}
                  className="btn btn-secondary btn-block mt-3 font-weight-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  createSession: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { createSession, logoutUser }
)(Login);
