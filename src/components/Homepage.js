import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser, getSession } from "../actions/authActions";
import { createNote, getNotes, getPageOfNotes } from "../actions/noteActions";

import NotesFeed from "./NotesFeed";

class Homepage extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      body: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newNote = {
      title: this.state.title,
      body: this.state.body
    };

    this.props.createNote(newNote, this.props.auth.session);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
  }

  getAllNotes(after, volume) {
    this.props.getNotes(this.props.auth.session, after, volume);
  }

  async componentDidMount() {
    await this.getAllNotes(null, null);
  }

  onNextClick(e) {
    this.props.getPageOfNotes(this.props.auth.session, 1, 3);
  }

  onPrevClick(e) {
    this.props.getPageOfNotes(this.props.auth.session, 0, 3);
  }

  render() {
    const { errors } = this.state;
    const { notes, loading } = this.props.note;
    let noteContent;

    if (notes === null || loading) {
      noteContent = <h1>Loading...</h1>;
    } else {
      noteContent = <NotesFeed notes={notes} />;
    }

    return (
      <div className="homepage">
        <div className="container">
          {errors.length > 0 ? (
            <div className="alert alert-danger mt-3 mb-3">{errors}</div>
          ) : null}
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-6 text-center mb-3">Notatki</h1>
              {noteContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  auth: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  createNote: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  note: state.note,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, getSession, createNote, getNotes }
)(Homepage);
