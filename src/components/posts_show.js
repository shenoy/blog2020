import React from "react";
import { fetchPost, deletePost } from "../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PostsShow extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>...Loading</div>;
    }
    return (
      <div className="ui container">
        <Link to="/">
          <h3>Back to Index</h3>
        </Link>
        <button
          className="ui button red right floated content"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete
        </button>
        <h1>{post.title}</h1>

        <font size="5">
          <p>{post.content}</p>
        </font>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
