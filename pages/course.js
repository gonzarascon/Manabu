import React, { PureComponent } from 'react';
import axios from 'axios';
import { Layout, IntroCourse } from 'components';
import { Router } from 'next/router';

class Course extends PureComponent {
  static async getInitialProps({ query: { courseData, user } }) {
    const res = await courseData;
    const resUser = await user;

    return { courseData: res, actualUser: resUser };
  }

  async takeCourse(url) {
    await axios
      .get(url)
      .then(({ data }) =>
        Router.push(`/course/${data.course_id}/take/stage/${current_class}`)
      )
      .catch(error => console.log('cannot redirect'));
  }

  render() {
    const { courseData, viewportSize, actualUser, loggedUserData } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <IntroCourse
          responsiveSize={viewportSize}
          courseData={courseData}
          loggedUserData={loggedUserData}
          takeCourse={this.takeCourse}
        />
      </Layout>
    );
  }
}

export default Course;
