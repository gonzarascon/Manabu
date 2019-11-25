import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import _ from 'lodash';
import validator from 'validator';
import { Layout, CreateCourseLayout, UserContext } from 'components';

class create extends PureComponent {
  static async getInitialProps({ query }) {
    const { user_id, languages } = query;
    return { user_id, languages };
  }

  static contextType = UserContext;

  constructor() {
    super();
    this.state = {
      courseName: '',
      courseDescription: '',
      courseLevel: '',
      courseLanguages: {},
      coursePhoto: '',
      formError: {
        name: false,
        description: false,
        level: false,
        languages: false
      }
    };
    this.changeInput = this.changeInput.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
    this.validate = this.validate.bind(this);
  }

  changeInput(state, value, errorCode) {
    const { formError } = this.state;

    if (state === 'courseLanguages') {
      const { courseLanguages } = this.state;
      this.setState({
        courseLanguages: value,
        formError: { ...formError, [errorCode]: false }
      });
    }
    this.setState({
      [state]: value,
      formError: { ...formError, [errorCode]: false }
    });
  }

  async handleCreation(value) {
    const { token } = this.context;
    const { user_id } = this.props;

    value.user_id = user_id;

    await axios
      .post(
        '/course/create',
        { value, user_id },
        {
          params: {
            access_token: token
          }
        }
      )
      .then(response => {
        const { data } = response;
        return Router.replace(`/course/${data.id}/edit/dashboard`);
      })
      .catch(error => console.error('error creating course', error));
  }

  validate(value) {
    const {
      courseName,
      courseDescription,
      courseLevel,
      courseLanguages,
      coursePhoto,
      formError
    } = this.state;

    if (validator.isEmpty(courseName))
      this.setState({ formError: { ...formError, name: true } });

    if (validator.isEmpty(courseDescription))
      this.setState({ formError: { ...formError, description: true } });

    if (validator.isEmpty(courseLevel))
      this.setState({ formError: { ...formError, level: true } });

    if (_.isEmpty(courseLanguages))
      this.setState({ formError: { ...formError, languages: true } });

    if (
      !validator.isEmpty(courseName) &&
      !validator.isEmpty(courseDescription) &&
      !validator.isEmpty(courseLevel) &&
      !_.isEmpty(courseLanguages)
    ) {
      this.handleCreation(value);
    }
  }

  render() {
    const {
      state,
      props: { user_id, languages, viewportSize, actualUser }
    } = this;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <CreateCourseLayout
          handleInput={this.changeInput}
          values={state}
          languages={languages}
          creationHandler={this.validate}
          formError={this.state.formError}
        />
      </Layout>
    );
  }
}

export default create;
