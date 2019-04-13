import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import TextFieldGroup from "./common/TextFieldGroup";

import { createNote } from "../actions/noteActions";

class NoteForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      errors: ""
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

    if (!newNote.title) {
      this.setState({ errors: "Wprowadź tytuł notatki" });
    } else if (!newNote.body) {
      this.setState({ errors: "Wprowadź treść notatki" });
    } else {
      this.props.createNote(newNote, this.props.auth.session);
      this.setState({
        title: "",
        body: ""
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        {errors.length > 0 ? (
          <div className="alert alert-danger mt-3 mb-3">{errors}</div>
        ) : null}
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
          <button type="submit" className="btn btn-block btn-dark mb-3">
            <strong>Dodaj</strong>
          </button>
        </form>
      </div>
    );
  }
}

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createNote }
)(NoteForm);
