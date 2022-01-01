import React from 'react';
import axios from 'axios';

import { Grid, Card, CardContent, Typography, TextField, Button } from '@material-ui/core';


const App = () => {
  const [posts, setPosts] = React.useState([]);

  const initialFormData = Object.freeze({
    title: '',
    content: '',
  });

  const [postData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    console.log(e.target.value);
    updateFormData({
      ...postData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);

    axios
    .post('http://127.0.0.1:8001/api/posts', formData)
    .then(function (response) {
      console.log(response.data);
      setPosts([...posts, response.data]);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  React.useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/posts');
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2}
        style={{ padding: '24px', width: "100%", margin: "0px" }}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="title" name="title" label="Title" variant="outlined"
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={handleChange} />
            <TextField
              id="content" name="content" variant="outlined" label="Content" multiline rows={4}
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create Post
            </Button>
          </form>
        </Grid>
        {posts.map(post =>
          <Grid item xs={6} key={post.id}>
            <PostCard post={post} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};


const PostCard = ({ post }) => {
  return (
    <React.Fragment>
      <Card height={100}>
        <CardContent>
          <Typography variant="h4">{post.title}</Typography>
          <Typography variant="body2">{post.content}</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default App;
