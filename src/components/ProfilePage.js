import React, { useEffect, useState, useContext } from "react";
import UserContext from '../contexts/UserContext';
import PostContext from "../contexts/PostContext";
import {

    Button, Card,
  } from "react-bootstrap";
  import { Link } from "react-router-dom";


function Profile(){
    const [posts, setPosts] = useState([]);

    const handleDelete = (id) => {
      deletePost(id);
    };
    // let user = null;
    // const userString = localStorage.getItem('user');
    // if (userString) {
    //     user = JSON.parse(userString);
    // }
    // console.log(user);

    let { user } = useContext(UserContext);
    let { getPostsByUserId, deletePost } = useContext(PostContext);

    useEffect(() => {
        async function fetchData() {
            if (user?.id) {
                const postsData = await getPostsByUserId(user?.id);
                setPosts(postsData.data);
                console.log(posts);
            }
        }
        fetchData();
      }, [user]);

    return(
        <div>
            <h1>Profile</h1>
            ID: {user?.id}<br/>
            Name: {user?.firstName}


            <div>
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <Card style={{ width: '18rem', margin: 'auto', display: 'block' }}>
               <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>
            <div dangerouslySetInnerHTML={{__html: post.content}} />
            
            
            </Card.Text>
            <Link to={`/${post.id}/edit`} key={post.id} className="btn btn-primary mx-3">Edit</Link>
            <Button variant="danger" onClick={() => handleDelete(post.id)}>
              Delete
            </Button>
            </Card.Body>
            </Card>
          </div>
        ))}
      </div> 

        </div>
    
    
)}

export default Profile;