import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAllLocations,
  getAllShares,
  getPostById,
} from "../api/api";
import ShareButton from "../buttons/ShareButtons";
import Preview from "../music/preview";

const Share = () => {
  const { format } = require("date-fns");
  const { id } = useParams();
  const [locations, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({ datetime: "2023-09-17T11:49:23.162320Z" });
  const [allShares, setShares] = useState([]);

  //Load locations and get post by id
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const data = await getAllLocations();
      const post = await getPostById(id);

      setLocation(data);
      setIsLoading(false);

      setPost(post);
      console.log("Locations ", locations);
      console.log("Post", post);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchShares = async () => {
      const shares = await getAllShares();
      setShares(shares);
    };
    fetchShares();
  }, []);
  const { name, datetime } = post;

  const dateObject = new Date(datetime);
//change date format
  const formattedDateTime = format(dateObject, "h:mm a 'on' dd MMMM yyyy");

  return (
    <div>
      <h2 className="title">Share This Sample</h2>

      <div className="card">
        <div className="song-details">
          <h3>{name}</h3>
          <p>{formattedDateTime}</p>
        </div>
        <div className="buttons">
          <button onClick={() => {
              Preview({ post: post }); }} style={{ cursor: "pointer" }} className="bright-button"
              >Preview</button>
        </div>
      </div>
      {isLoading ? ( // Conditional rendering based on loading state
        <p>Loading...</p>) : (locations.map((location) => (
          <div className="toggle-row-container" key={location.id}>
            <div className="location-name-label">
              <h4>{location.name}</h4>
            </div>
            <div className="sequence-row-container">
              <ShareButton
                locationId={location.id}
                sampleId={post.id}
                allShares={allShares}
              />
            </div>
          </div>
        ))
      )}
      <div>
        <button className="toggle" onClick={() => getAllShares()}>Get all shares</button>
      </div>
    </div>
  );
};
export default Share;
