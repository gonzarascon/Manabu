import React, { PureComponent } from 'react';
import { userRouter } from 'next/router';
import { Layout, CreateCourseLayout } from 'components';

class create extends PureComponent {
  static async getInitialProps({ query }) {
    console.log('query', query.user_id);
    const { user_id, languages } = query;
    return { user_id, languages };
  }

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
  }

  changeInput(state, value) {
    this.setState({ [state]: value });
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
        />
      </Layout>
    );
  }
}

export default create;
