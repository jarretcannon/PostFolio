import React, { useEffect, useState, useContext } from "react";
import PostContext from "./PostContext";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const baseUrl = "http://localhost:3001/posts";

  let { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      await getAllPosts();
    }
    fetchData();
  }, []);

  function getAllPosts() {
    return axios.get(baseUrl).then((response) => setPosts(response.data));
  }

  function getPostsByUserId(userId) {
    return axios.get(baseUrl + "?userId=" + userId);
  }

  function getPost(id) {
    return posts.find((post) => post.id === parseInt(id));
  }

  function addPost(post) {
    if (!user?.id) {
      alert("You need to be logged in!");
      // TODO forward user to log in page
      throw new Error("You need to be logged in!");
    } else {
      return axios
        .post(baseUrl, { ...post, userId: user.id })
        .then((response) => {
          getAllPosts();
          return new Promise((resolve) => resolve(response.data));
        });
    }
  }

  function deletePost(id) {
    axios.delete(`${baseUrl}/${id}`).then(getAllPosts);
  }

  function updatePost(id, post) {
    return axios.put(`${baseUrl}/${id}`, post).then((response) => {
      getAllPosts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        getAllPosts,
        getPostsByUserId,
        getPost,
        addPost,
        deletePost,
        updatePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
