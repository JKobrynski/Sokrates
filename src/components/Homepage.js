// Komponent strony domowej widocznej tylko po zalogowaniu

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Import akcji
import { createNote, getNotes } from "../actions/noteActions";

// Import komponentu wyświetlającego notatki uzytkownika
// i formularz tworzący notatki
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

    // Obiekt nowej notatki
    const newNote = {
      title: this.state.title,
      body: this.state.body
    };

    // Wykonanie funkcji zapisującej notatkę
    this.props.createNote(newNote, this.props.auth.session);
  }

  componentWillReceiveProps(nextProps) {
    // Przeniesienie uzytkownika na strone startowa
    // w przypadku gdy nie ma autoryzacji
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  // Metoda (wykonuje funkcję) pobierająca notatki
  getAllNotes() {
    this.props.getNotes(this.props.auth.session);
  }

  // Pobranie wszystkich notatek w momencie
  // załadowania komponentu
  componentDidMount() {
    this.getAllNotes();
  }

  render() {
    const { errors } = this.state;
    const { notes, loading } = this.props.note;
    let noteContent;

    // Jeśli notatki są w stanie loading (są w trakcie pobierania z API)
    // wyswietlenie "Loading"
    // Jeśli notatki zostały juz pobrane, przekazanie ich do komponentu,
    // który je wyświetla
    if (notes === null || loading) {
      noteContent = <h1>Loading...</h1>;
    } else {
      noteContent = <NotesFeed notes={notes} />;
    }

    return (
      <div className="homepage">
        <div className="container">
          {/* Wyswietlenie błędów (jeśli istnieja) */}
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
  { createNote, getNotes }
)(Homepage);
