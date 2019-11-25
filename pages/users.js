import React, { PureComponent } from 'react';
import { Layout, UserLayout } from 'components';

class Users extends PureComponent {
  static async getInitialProps({ query: { userData, userTakenCourses } }) {
    const data = await userData;
    const userCourses = await userTakenCourses;
    return { userData: data, userTakenCourses: userCourses };
  }

  render() {
    const { viewportSize, userData, userTakenCourses } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={userData}>
        <UserLayout
          responsiveSize={viewportSize}
          userData={userData}
          userTakenCourses={userTakenCourses}
        ></UserLayout>
      </Layout>
    );
  }
}

export default Users;
