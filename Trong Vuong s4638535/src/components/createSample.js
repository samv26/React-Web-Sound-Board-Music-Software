import React, { Component } from "react";
import { Link } from "react-router-dom";
class CreateSample extends Component {
  state = {};
  render() {
    const id = "-1";
    return (
      <div className="create-card2">
        <Link
          style={{ cursor: "pointer" }}
          to={`/createSong/${id}`}
          className="bright-button"
        >
          Create Sample
        </Link>
      </div>
    );
  }
}

export default CreateSample;
