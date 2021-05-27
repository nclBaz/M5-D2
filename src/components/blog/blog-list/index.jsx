import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";

export default class BlogList extends Component {
  state = {
    posts: [],
  };
  componentDidMount = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/posts`);
      if (res.ok) {
        const data = await res.json();
        this.setState({ posts: data });
      } else {
        throw new Error("something went wrong with the fetch!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <Row>
        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
