import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PostContext from '../contexts/PostContext';

function CreatePost() {
  const [item, setItem] = useState({
    title: '',
    content: '',
  });

  const { addPost } = useContext(PostContext);
  const navigate = useNavigate();
  const { title, content } = item;

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
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
}

export default CreatePost;
