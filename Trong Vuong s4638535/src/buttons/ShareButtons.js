import React, { useState,useEffect } from "react";
import {createShare,deleteShare,getAllShares} from "../api/api";

const ShareButton = ({ locationId, sampleId, allShares }) => {
  const [isShared, setIsShared] = useState(false);

//Set the share states
  const loadShares = () => {
    const bol = allShares.filter(
        (element) =>
          (element.location_id == locationId) & (element.sample_id == sampleId)
      ).length;

  console.log("Number of shares", bol)
  if(bol > 0){
    setIsShared(true);
  }
  } 
//Help from chat gpt
  useEffect(() => {
    loadShares();
  }, []);

//Create share
  const handleShareClick = () => {
    setIsShared((prevIsShared) => true);
    // Call the function to share the item 
    createShare(locationId, sampleId);
  };
//Delete share
  const handleUnshareClick = () => {
    setIsShared((prevIsShared) => false);
    // Call the function to unshare the item 
    deleteShare(locationId, sampleId, allShares);
  };

  return (
        <><>{loadShares}</>
      <button
        className={`toggle${isShared ? "-selected" : ""}`}
        onClick={handleShareClick}
      >
        Shared
      </button>
      <button
        className={`toggle${!isShared ? "-selected" : ""}`}
        onClick={handleUnshareClick}
      >
        Not Shared
      </button>
    </>
  );
};
export default ShareButton;
