import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

function CreatePost() {
  const [item, setItem] = useState({
    title: '',
    embed: '',
    credit: '',
    caption:'',
  });

  const { addPost } = useContext(PostContext);
  const navigate = useNavigate();
  const { title, embed, credit, caption } = item;

  function handleChange(event) {
    const { id, value } = event.target;
    setItem((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    addPost(item)
      .then(() => navigate('/'))
      .catch((error) => {
        console.error('Error adding post:', error);
        alert(error.message)
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
          as="textarea"
          rows="5"
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

export default CreatePost;
