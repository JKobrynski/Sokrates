import React, { Component } from "react";
import PropTypes from "prop-types";

class Note extends Component {
  render() {
    const { note, auth } = this.props;

    return (
      <div className="card mb-3" style={{ backgroundColor: "LightGrey" }}>
        <div className="card-body">
          <h3 className="card-title">{note.name}</h3>
          <p className="card-text lead">{note.text}</p>
        </div>
      </div>
    );
  }
}

export default Note;
