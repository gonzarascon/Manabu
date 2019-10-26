import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Layout, EditStageLayout } from 'components';

class stage extends PureComponent {
  render() {
    const { viewportSize, actualUser } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <EditStageLayout />
      </Layout>
    );
  }
}

export default stage;
