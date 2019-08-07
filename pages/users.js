import React, { PureComponent } from 'react';
import { UserLayout } from 'components';

class Users extends PureComponent {
  static getInitialProps({ query: { username } }) {
    return { username };
  }

  render() {
    const { viewportSize, userData } = this.props;
    return (
      <UserLayout
        responsiveSize={viewportSize}
        userData={userData}
      ></UserLayout>
    );
  }
}

export default Users;
