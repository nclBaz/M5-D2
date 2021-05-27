import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  state = {
    title: "",
    category: "Category1",
    content: "",
  };

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  }

  postBlog = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      let response = await fetch(`${apiUrl}/posts`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });

      if (response.ok) {
        console.log(response);
      }
    } catch (error) {}
  };

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={(e) => this.postBlog(e)}>
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              size="lg"
              placeholder="Title"
              id="title"
              onChange={(e) => this.handleChange(e)}
              value={this.state.title}
            />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              size="lg"
              as="select"
              id="category"
              onChange={(e) => this.handleChange(e)}
              value={this.state.category}
            >
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="new-blog-content"
              id="content"
              onChange={(e) => this.handleChange(e)}
              value={this.state.content}
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
