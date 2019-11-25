import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';

import { Layout, FinishedLayout } from 'components';

class finished extends PureComponent {
  render() {
    const { viewportSize, actualUser } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <FinishedLayout />
      </Layout>
    );
  }
}

export default finished;
