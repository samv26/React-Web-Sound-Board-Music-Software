import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Card from "./songCard";
import { deletePost, getAllPosts } from "../api/api";
import CreateSample from "./createSample";
const Homepage1 = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Load post at initialisation
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Start loading
      const data = await getAllPosts();
      setPosts(data);
      setIsLoading(false); // End loading
    };
    fetchPosts();
  }, []);
  //Delete all postksa
  async function deleteAll (){
    const data = await getAllPosts();
    data.forEach(element => {
      deletePost(element.id);
    });
  }

  return (
    <div>
      <CreateSample />
      {isLoading ? ( // Conditional rendering based on loading state
        <p>Loading...</p>
      ) : (
        posts.map((post) => <Card key={post.name} post={post} />)
      )}
      <CreateSample />
      <button onClick = {deleteAll}>Delete All</button>
    </div>
  );
};

export default Homepage1;
