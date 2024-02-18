import React, { useEffect, useState } from "react";
import PostContext from "./PostContext";
import axios from "axios";

export const PostProvider = (props) => {
  const [post, setPost] = useState([]);
  const baseUrl = "http://localhost:3001/posts";

  useEffect(() => {
    async function fetchData() {
      await getAllPosts();
    }
    fetchData();
  }, []);

  function getAllPosts() {
    return axios.get(baseUrl).then((response) => setPost(response.data));
  }

  function getPost(id) {
    const postUrl = `${baseUrl}/${id}`;

    return axios.get(postUrl).then((response) => {
      setPost([response.data]);
      return response.data;
    });
  }

  function addPost(post) {
    return axios.post(baseUrl, post).then((response) => {
      getAllPosts();
      return response.data;
    });
  };

    function editPost(updatedPost){
        const postId = updatedPost.postId;
        const tweetUrl = `${baseUrl}/${postId}`;
        
        return axios.put(postUrl, updatedPost).then(response => {
            setPost((prevPosts) => {
                return prevPosts.map((post) => {
                    if (post.postId === postId){
                        return response.data;
                    }
                });
                return getAllPosts();
            })
        })
    };

    function deletePost(id){
        const postUrl = `${baseUrl}/${id}`

        return axios.delete(postUrl).then(() => {
            getAllPosts();
        })
    }

  return (
    <PostContext.Provider
      value={{
        post,
        getAllPosts,
        getPost,
        addPost,
        editPost,
        deletePost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

