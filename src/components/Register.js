import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "./common/TextFieldGroup";
import {
  registerUser,
  createSession,
  getSessionInfo
} from "../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      register: false,
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      // Maybe logout user
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(newUser);

    if (this.state.register) {
      this.props.registerUser(newUser, this.props.history);
    } else {
      console.log("logging in");
      this.props.createSession(newUser.email, newUser.password);
      console.log(this.props);
    }
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      register: !this.state.register
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {this.state.register ? (
                <h1 className="display-4 text-center">Register</h1>
              ) : (
                <h1 className="display-4 text-center">Login</h1>
              )}
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
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Nie posiadam konta
                  </label>
                </div>
                <input
                  type="submit"
                  value="Zatwierdź"
                  className="btn btn-info btn-block mt-4 font-weight-bold"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  createSession: PropTypes.func.isRequired,
  getSessionInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser, createSession, getSessionInfo }
)(Register);
