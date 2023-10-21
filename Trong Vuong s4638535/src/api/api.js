/**
 * Base URL for API requests.
 */

const APIKEY = "mKAIuZdqQN";

const baseURL = "https://comp2140.uqcloud.net/api/";

/**
 * Fetches all posts from the API.
 * @returns {Promise} - Promise resolving to an array of all posts.
 */
export const getAllPosts = async () => {
  const url = `${baseURL}sample/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};
//Get share locations from api
export const getAllLocations = async () => {
  const url = `${baseURL}location/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

//Get shares from api
export const getAllShares = async () => {
  const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  console.log("Here are your sharess", json);
  return json;
};

/**
 * Fetches a single post by ID.
 * @param {string} id - The ID of the post.
 * @returns {Promise} - Promise resolving to the post object.
 */
export const getPostById = async (id) => {
  const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

/**
 * Creates a new post.
 * @param {object} post - The post object containing title and body.
 * @returns {Promise} - Promise resolving to the created post object.
 */
export const createPost = async (post) => {
  const url = `${baseURL}sample/?api_key=${APIKEY}`;
  //console.log("this is the name ==== ", name);
  const recording_data = post.recording_data;
  const data = {
    type: "piano",
    name: post.name,
    recording_data: JSON.stringify(recording_data),
    api_key: APIKEY,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};
//Upload the share to api
export const createShare = async (locationId,musicId) => {
  const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
  //console.log("this is the name ==== ", name);
  console.log("Postingg the share");
  
  const data = {
    api_key: APIKEY,
    sample_id: musicId,
    location_id: locationId,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

/**
 * Updates an existing post by ID.
 * @param {string} id - The ID of the post to update.
 * @param {object} post - The updated post object.
 * @returns {Promise} - Promise resolving to the updated post object.
 */
export const updatePost = async (id, post) => {
  const data = {
    type: post.type,
    name: post.name,
    recording_data: JSON.stringify(post.recording_data),
    api_key: APIKEY,
  };
  const response = await fetch(`${baseURL}sample/${id}/?api_key=${APIKEY}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

//Delete posts
export const deletePost = async (id) => {
  try {
    const response = await fetch(`${baseURL}sample/${id}/?api_key=${APIKEY}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    return true; // Return true to indicate successful deletion
  } catch (error) {
    console.error("Error deleting post:", error);
    return false; // Return false to indicate deletion failure
  }
};

//Delete share
export const deleteShare = async (locationsId, musicId, shares) => {
  const filter = shares.filter(
    (element) =>
      (element.location_id == locationsId) & (element.sample_id == musicId)
  );
  console.log("Current shares are ", shares);
  console.log("Filter is ", filter);

  let deletePromises;
    deletePromises = filter.map(async (element) => {
      try {
        const response = await fetch(
          `${baseURL}sampletolocation/${element.id}/?api_key=${APIKEY}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete post");
        }

        return true; // Return true to indicate successful deletionKs
      } catch (error) {
        console.error("Error deleting post:", error);
        return false; // Return false to indicate deletion failure
      }
    });
};




