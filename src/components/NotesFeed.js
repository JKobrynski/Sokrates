import React, { Component } from "react";
import PropTypes from "prop-types";
import Note from "./Note";

class NotesFeed extends Component {
  render() {
    const { notes } = this.props;

    return notes.map(note => <Note key={note.name} note={note} />);
  }
}

NotesFeed.propTypes = {
  notes: PropTypes.array.isRequired
};

export default NotesFeed;
