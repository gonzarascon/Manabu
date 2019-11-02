import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Layout, CourseDashboardLayout } from 'components';

class stage extends PureComponent {
  static async getInitialProps({ query }) {
    const { course_data } = await query;

    return { course_data };
  }

  render() {
    const { viewportSize, actualUser, course_data } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <CourseDashboardLayout course_data={course_data} />
      </Layout>
    );
  }
}

export default stage;
