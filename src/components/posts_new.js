import React from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { createPost } from "../actions";
import { connect } from "react-redux";

class PostsNew extends React.Component {
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""} `;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" label="title" component={this.renderField} />
        <Field
          name="categories"
          label="categories"
          component={this.renderField}
        />
        <Field name="content" label="content" component={this.renderField} />
        <button className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}
const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "please enter a title";
  }

  if (!values.categories) {
    errors.categories = "please enter a category";
  }

  if (!values.content) {
    errors.content = "please enter some content";
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));
