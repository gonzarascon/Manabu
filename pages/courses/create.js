import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { userRouter } from 'next/router';
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
      courseLanguages: [],
      coursePhoto: ''
    };
    this.changeInput = this.changeInput.bind(this);
    this.handleCreation = this.handleCreation.bind(this);
  }

  changeInput(state, value) {
    this.setState({ [state]: value });
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
        return Router.replace(`/course/${data.id}/edit/class`);
      })
      .catch(error => console.error('error creating course', error));
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
          creationHandler={this.handleCreation}
        />
      </Layout>
    );
  }
}

export default create;
