import React, { useEffect, useState } from "react";
import PostContext from "./PostContext";
import axios from "axios";

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const baseUrl = "http://localhost:3001/posts";

  useEffect(() => {
    async function fetchData() {
      await getAllPosts();
    }
    fetchData();
  }, []);

  function getAllPosts() {
    return axios.get(baseUrl).then((response) => setPosts(response.data));
  }

function getPost(id){
  return posts.find(post => post.id === parseInt(id))
}

  function addPost(post){
    return axios.post(baseUrl, post)
    .then(response => {
      getAllPosts();
      return new Promise(resolve => resolve(response.data));
      }
    );
  }

function deletePost(id){
  axios.delete(`${baseUrl}/${id}`)
  .then(getAllPosts)
}

function updatePost(id, post){
  return axios.put(`${baseUrl}/${id}`, post)
  .then(response => {
    getAllPosts()
    return new Promise((resolve) => resolve(response.data))
  })
}

  return (
    <PostContext.Provider
      value={{
        posts,
        getAllPosts,
        getPost,
        addPost,
        deletePost,
        updatePost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

