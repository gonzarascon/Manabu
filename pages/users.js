import React, { PureComponent } from 'react';
import { UserLayout } from 'components';

class Users extends PureComponent {
  static getInitialProps({ query: { username } }) {
    return { username };
  }

  render() {
    const { viewportSize } = this.props;
    return <UserLayout responsiveSize={viewportSize}></UserLayout>;
  }
}

export default Users;
