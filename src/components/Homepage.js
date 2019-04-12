import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logoutUser, getSession } from "../actions/authActions";
import { createNote, getNotes } from "../actions/noteActions";

import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import TextFieldGroup from "./common/TextFieldGroup";
import InputGroup from "./common/InputGroup";

import Note from "./Note";

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

  render() {
    const { errors } = this.state;
    const { notes } = this.props.note;

    const notesFeed = notes.map(note => <Note key={note.name} note={note} />);

    return (
      <div className="homepage">
        <div className="container">
          {errors.length > 0 ? (
            <div className="alert alert-danger mt-3 mb-3">{errors}</div>
          ) : null}
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-6 text-center mb-3">Notatki</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Tytuł"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup
                  placeholder="Treść"
                  name="body"
                  value={this.state.body}
                  onChange={this.onChange}
                  info="Wprowadź treść notatki"
                />
                <input
                  type="submit"
                  value="Dodaj"
                  className="btn btn-info btn-block mt-4 mb-4 font-weight-bold"
                />
              </form>
              {notesFeed}
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
  getNotes: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
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
