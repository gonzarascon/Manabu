import React, { PureComponent } from 'react';
import { Layout, UserLayout } from 'components';

class Users extends PureComponent {
  static getInitialProps({ query: { userData } }) {
    console.log('userData InitialProps', userData);
    return { userData };
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
