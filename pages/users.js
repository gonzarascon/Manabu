import React, { PureComponent } from 'react';
import { Layout, UserLayout } from 'components';

class Users extends PureComponent {
  static async getInitialProps({ query: { userData } }) {
    const data = await userData;
    return { userData: data };
  }

  render() {
    const { viewportSize, userData } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={userData}>
        <UserLayout
          responsiveSize={viewportSize}
          userData={userData}
        ></UserLayout>
      </Layout>
    );
  }
}

export default Users;
