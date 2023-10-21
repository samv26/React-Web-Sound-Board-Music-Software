import { getPostById, createPost, updatePost } from "../api/api";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ToggleButtons from "../buttons/toggleTypeButtons";
import {PlayTone} from "../music/playTone";
import Preview from "../music/preview";




const CreateSong = ({ tO, tT, tP }) => {
 
  const { id } = useParams();
  const emptyArray = [
    {"B": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
    {"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
    {"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
    {"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
    {"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
    {"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]},
    {"C": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}
  ] ;
 
  const [isSaving, setIsSaving] = useState(false);

  const history = useNavigate();
  const [post, setPost] = useState({
    api_key: "mKAIuZdqQN",
    name:"new",
    recording_data: emptyArray,
    type: "piano",
    
  });
  const [sample, setSample] = useState(post.recording_data);
 //UseEffect hook with id
  useEffect(() => {
      const fetchPost = async () => {
        const data = await getPostById(id);
        console.log("Data : ",data);
        if(data.name !== undefined && data.id !== "new"){
        setSample(JSON.parse(data.recording_data));
        setPost(data);
        setType(data.type);
      }
    }
      fetchPost();
}, [id]);

//Useeffeect hook with post
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostById(id);
      setSample(JSON.parse(data.recording_data));
      setPost(data);
      setType(data.type);
    
    fetchPost();
  }
  }, [post]);

  
 const [ type , setType] = useState(post.type);

 //flip the state of button
  const toggleValue = (letterIndex, buttonIndex) => {
    const updatedTone = [...sample]; 
    updatedTone[letterIndex][Object.keys(updatedTone[letterIndex])[0]][
      buttonIndex
    ] =
      !updatedTone[letterIndex][Object.keys(updatedTone[letterIndex])[0]][
        buttonIndex
      ];
    setSample(updatedTone);
    let postModified = post;
    postModified.recording_data = updatedTone;
    setPost(postModified);
  };

  //Saving by update or post the sample
  const handleSave = async () => {
    const updatedTone = [...sample]; 
    let postModified = {...post};
    postModified.recording_data = updatedTone;
    
    setIsSaving(true); 
    try {
      if (id === "-1") {
        await createPost(postModified);
        history("/");
      } else {
        await updatePost(id, postModified);
        history("/");
      }
    } catch (error) {
      console.log("Cat");
      // Handle error appropriately
    } finally {
      setIsSaving(false); // Set loading to false when save is complete
    }
  };

//handle change of instrument type
  const handleSelectedTypeChange = (newSelectedType) => {
    setPost((prevPost) => ({
      ...prevPost, 
      type: newSelectedType, 
    }));
    setType(newSelectedType);
  };
  
  console.log("Post = ", post);
  console.log("Mysic type = ", post.type);
  
  if(typeof sample == String){
    console.log("Using this function here");
    setSample(JSON.parse(sample));
  }

  //Error checking for sample 
  if (Array.isArray(sample)) {
    const result = sample.map((item, index) => {
      const key = Object.keys(item)[0]; // Get the key (e.g., 'B', 'A', 'G')
      const value = item[key]; // Get the corresponding value (e.g., Array(16))
      return { key, value };
    });

    console.log(result);
  } else {
    console.error("sample is not an array");
  }

 
  return (
    <div>
      <h2 className="title">Edit Sample:</h2>
      {/* <>{updateEverything}</> */}
      <form className="card edit-card">
        <input
          type="text"
          value={post.name}
          onChange={(e) => {
            const newName = e.target.value;
            setPost((prevPost) => ({...prevPost,name: newName,}));
          }}
        ></input>
        <div className="button-group-container">
          <button
            onClick={(e) => {e.preventDefault(); Preview({ post: post, tO: tO, tT: tT, tP: tP });
            }} style={{ cursor: "pointer" }} className="bright-button">Preview</button>
          <button
            onClick={handleSave} type="button" className="bright-button" disabled={isSaving}>Save</button>
        </div>
      </form>

      <div className="toggle-row-container">
        <div className="row-label">
          <h4>Instrument</h4>
        </div>
        <ToggleButtons typeProps={type} onSelectedTypeChange={handleSelectedTypeChange}
        />
      </div>

      {/* help from chat gpt */}
      <div>
        {sample.map((element, index) => (
          <div className="toggle-row-container" key={index}>
            <div className="row-label">
              <h4>{Object.keys(element)}</h4>
            </div>
            <div className="sequence-row-container">
              {Object.values(element)[0].map((value, buttonIndex) => (
                <button
                  className={`toggle${value ? "-selected" : ""}`} key={buttonIndex} onClick={() => {toggleValue(index, buttonIndex);
                    // handleBarClick();
                    try {
                      PlayTone({
                      instrument: post.type,
                      note: Object.keys(element)[0],
                      tO: tO
                    });
                    } catch (error) {
                      console.log("This note is not available please use piano and then save first");
                    }
                  }}
                ></button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSong;
