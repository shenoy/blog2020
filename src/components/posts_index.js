import React from "react";
import { fetchPosts } from "../actions";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

class PostsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts = () => {
    return _.map(this.props.posts, post => {
      return (
        <div key={post.id} className="ui celled list">
          <li>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="ui container">
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            <h3>Add a post</h3>
          </Link>
        </div>
        <h2>Posts</h2>
        <ul>
          <h3>{this.renderPosts()}</h3>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
