import React, { PureComponent } from 'react';
import { Layout, UserLayout, UserContext } from 'components';

class Users extends PureComponent {
  static async getInitialProps({ query: { userData, userTakenCourses } }) {
    const data = await userData;
    const userCourses = await userTakenCourses;
    return { userData: data, userTakenCourses: userCourses };
  }

  static contextType = UserContext;

  render() {
    const { token } = this.context;
    const { viewportSize, userData, userTakenCourses } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={userData}>
        <UserLayout
          responsiveSize={viewportSize}
          userData={userData}
          userTakenCourses={userTakenCourses}
          token={token}
        ></UserLayout>
      </Layout>
    );
  }
}

export default Users;
