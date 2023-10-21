import Preview from "../music/preview";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
const { format } = require("date-fns");

export const Card = ({ post }) => {
  const { name, datetime, id } = post;

  const dateObject = new Date(datetime);

  const formattedDateTime = format(dateObject, "h:mm a 'on' dd MMMM yyyy");
  const [isPlaying, setPlaying] = useState(false);

  console.log("From Card:", post);
  //deletePost(post.id);

  return (
    <div>
      <section className="sample">
        <div className="card">
          <div className="song-details">
            <h3>{name}</h3>
            <p>{formattedDateTime}</p>
          </div>
          <div className="button-group-container">
            <button
              onClick={() => {
                Preview({ post: post });
              }}
              style={{ cursor: "pointer" }}
              className="bright-button"
            >
              Preview
            </button>
            <Link
              style={{ cursor: "pointer" }}
              className="bright-button"
              to={`/share/${id}`}
            >
              Share
            </Link>
            <Link
              style={{ cursor: "pointer" }}
              to={`/createSong/${id}`}
              className="bright-button"
            >
              Edits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
