import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser, getSession } from "../actions/authActions";

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onClick() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="homepage">
        <div className="container">
          <div className="row">
            <h1>Homepage</h1>
          </div>
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToPtops = state => ({
  auth: state.auth
});

export default connect(
  mapStateToPtops,
  { logoutUser, getSession }
)(Homepage);
