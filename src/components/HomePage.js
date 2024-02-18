import React,{ useContext, useEffect } from "react";
import PostContext from "../contexts/PostContext";

function HomePage(){
   const {post, getAllPosts} = useContext(PostContext);

   useEffect(() => {
      getAllPosts();
   }, []);
 return(
    <h1>{JSON.stringify(post)}</h1>
    
 )   
};

export default HomePage;