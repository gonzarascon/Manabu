import React, { PureComponent } from 'react';
import { Layout, IntroCourse } from 'components';

class Course extends PureComponent {
  static async getInitialProps({ query: { courseData, user } }) {
    const res = await courseData;
    const resUser = await user;

    return { courseData: res, actualUser: resUser };
  }

  render() {
    const { courseData, viewportSize, actualUser } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <IntroCourse responsiveSize={viewportSize} courseData={courseData} />
      </Layout>
    );
  }
}

export default Course;
