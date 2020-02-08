import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { createPost } from "../actions";
import { connect } from "react-redux";
import { Input, Button, Message } from "semantic-ui-react";

class PostsNew extends Component {
  renderField(field) {
    const {
      input,
      meta: { touched, error },
      ...custom
    } = field;
    const hasError = touched && error !== undefined;
    return (
      <div>
        <label>{field.label}</label>
        {hasError && <Message error header="error" content={error} />}
        <Input
          error={hasError}
          fluid
          placeholder={field.name}
          {...input}
          {...custom}
        />
      </div>
    );
  }

  submit = values => {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="ui container"
        onSubmit={handleSubmit(this.submit.bind(this))}
      >
        <Field name="title" label="title" component={this.renderField} />

        <Field name="content" label="content" component={this.renderField} />
        <br />

        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

const validate = values => {
  const { title, content } = values;
  const errors = {};
  if (!values.title || values.title.trim() === "") {
    errors.title = "title required";
  }

  if (!values.content) {
    errors.content = "please enter some content";
  }
  return errors;
};

export default reduxForm({
  form: "PostsNewform",
  validate
})(connect(null, { createPost })(PostsNew));
