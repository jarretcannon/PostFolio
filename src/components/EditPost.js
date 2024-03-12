import { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import PostContext from "../contexts/PostContext";


function UpdateItem() {
  const { id } = useParams();
  const [item, setItem] = useState({
    title: '',
    embed: '',
    credit: '',
    caption:'',
  });

  const { updatePost, post, getPost, addPost } = useContext(PostContext);
  const navigate = useNavigate();
  const { title, embed, credit, caption } = item;

  useEffect(() => {
    if (id === undefined) return;

    async function fetchPost() {
      const post = await getPost(id);
      setItem(post);
    }

    fetchPost();
  }, [id, getPost]);

  function handleChange(event) {
    const { id, value } = event.target;
    setItem((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    updatePost(id, item)
      .then(() => navigate('/'))
      .catch((error) => {
        console.error('Error adding post:', error);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label>Song Title</Form.Label>
      <Form.Control
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Embed Code</Form.Label>
      <Form.Control
        type="text"
        id="embed"
        name="embed"
        value={embed}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Credits</Form.Label>
      <Form.Control
        type="text"
        id="credit"
        name="credit"
        value={credit}
        onChange={handleChange}
      />
    </Form.Group>
    
    <Button type="submit">Save</Button>
  </Form>
  );
  
}

export default UpdateItem;
