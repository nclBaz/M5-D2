import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import "./styles.css";
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    // console.log(posts);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const res = await fetch(`${apiUrl}/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        this.setState({ blog: data, loading: false });
      } else {
        throw new Error("something went wrong with the fetch!");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    const { loading, blog } = this.state;
    console.log("blog ", blog);
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
