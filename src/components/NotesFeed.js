import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Import podkomponentów potrzebnych do stworzenia formularza
import TextAreaFieldGroup from "./common/TextAreaFieldGroup";
import TextFieldGroup from "./common/TextFieldGroup";

// Import funkcji tworzącej notatkę
import { createNote } from "../actions/noteActions";

class NotesFeed extends Component {
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

    // Walidacja danych wejściowych
    if (!newNote.title) {
      this.setState({ errors: "Wprowadź tytuł notatki" });
    } else if (!newNote.body) {
      this.setState({ errors: "Wprowadź treść notatki" });
    } else {
      // Utworzenie nowej notatki w przypadku, gdy nie wystąpiły błędy
      this.props.createNote(newNote, this.props.auth.session);
      // Wyczyszczenie pól formularza
      this.setState({
        title: "",
        body: ""
      });
    }
  }

  // "Nasłuchiwanie" na otrzymanie błędów
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // Obługa kliknięcia w przycisk "Edytuj"
  onEditClick(noteName, noteText) {
    this.setState({
      title: noteName,
      body: noteText
    });
    // Przesunięcie widoku na samą górę strony
    // aby ukazał się formularz do edycji
    window.scrollTo(0, 0);
  }

  render() {
    const { notes } = this.props;
    const { errors } = this.state;

    // Zmapowanie kazdej notatki do indywidualnego widoku
    const notesFeed = notes.map(note => (
      <div
        className="card mb-3"
        style={{ backgroundColor: "LightGrey" }}
        key={note.name}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-md-10 col-sm-10">
              <h3 className="card-title">{note.name}</h3>
            </div>
            <div className="col-md col-sm">
              <button
                onClick={this.onEditClick.bind(this, note.name, note.text)}
                className="btn-warning font-weight-bold"
              >
                Edit
              </button>
            </div>
          </div>
          <p className="card-text lead">{note.text}</p>
        </div>
      </div>
    ));

    return (
      <div>
        {/* Sprawdzenie czy istnieją jakieś błędy */}
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
        {notesFeed}
      </div>
    );
  }
}

NotesFeed.propTypes = {
  notes: PropTypes.array.isRequired,
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
)(NotesFeed);
