import React, { PureComponent } from 'react';
import axios from 'axios';
import { Layout, IntroCourse } from 'components';
import Router from 'next/router';

class Course extends PureComponent {
  static async getInitialProps({ query: { courseData, user } }) {
    const res = await courseData;
    const resUser = await user;

    return { courseData: res, actualUser: resUser };
  }

  async takeCourse(url) {
    console.log('takeCourse url', url);
    await axios
      .get(url)
      .then(response => {
        const { data } = response;
        console.log('data', data);
        return Router.push(
          `/course/${parseInt(data.course_id)}/take/stage/${data.current_class}`
        );
      })
      .catch(error => console.log('cannot redirect', error));
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
