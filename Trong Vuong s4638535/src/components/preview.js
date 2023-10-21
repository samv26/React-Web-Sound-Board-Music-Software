import React from "react";
import {
  guitar,
  piano,
  horn,
  drum,
  toneObject,
} from "../music/playNotes";


const Preview = ({ post, tO, tT, tP }) => {
  console.log("This is the most", post);
  let tone;
  try {
    tone = JSON.parse(post.recording_data);
  } catch (error) {
    // Handle the JSON parsing error here
    console.error("Error parsing JSON:", error);
    tone = post.recording_data;
  }

  if (!tone) {
    return <p>Loading...</p>;
  }
  let keys = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

  const filtered = tone.forEach((element, cIndex) => {
    Object.values(element)[0].forEach((value, rowIndex) => {
      keys[rowIndex].push(value);
    });
  });
  const alphabet = "BAGFEDC"; // Define the corresponding letters
  //help from chat gpt
  const result = keys.map((arr) =>
    arr
      .map((value, index) => (value ? alphabet[index] + "3" : ""))
      .filter((value) => value !== "")
  );


  function playPreview(instrument, result) {
    console.log("this is the result", result);
    let increment = 0;
    let now;
    try {
        now = tO.now();
    } catch (error) {
        now = toneObject.now();
    }
    try{
      switch (instrument) {
      case "guitar":
        result.forEach((element) => {
          guitar.triggerAttackRelease(element, "8n", now + increment);
          increment += 0.25;
        });

        break;
      case "piano":
        result.forEach((element) => {
          piano.triggerAttackRelease(element, "8n", now + increment);
          increment += 0.25; 
        });

        break;
      case "french horn":
        result.forEach((element) => {
          horn.triggerAttackRelease(element, "8n", now + increment);
          increment += 0.25;
        });

        break;
      case "drums":
        console.log("Currently in drums");
        result.forEach((element) => {
          drum.triggerAttackRelease(element, "8n", now + increment);
          increment += 0.25;
        });
        break;
    }
    }catch(error){
      console.log("not available");
    }
    
    
  }

  playPreview(post.type, result);
};
export default Preview;
