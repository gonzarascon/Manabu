import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Layout, CourseDashboardLayout } from 'components';

class stage extends PureComponent {
  static async getInitialProps({ query }) {
    const { course_data } = await query;

    return { course_data };
  }

  constructor() {
    super();

    this.deleteStage = this.deleteStage.bind(this);
  }

  async deleteStage(stage_id) {
    const {
      course_data: { id },
      access_token
    } = this.props;

    await axios
      .delete(`/courses/${id}/delete/stage/${stage_id}`, {
        params: { access_token }
      })
      .then(response => {
        Router.push(`/course/${id}/edit/dashboard`);
      })
      .catch(error => console.log(new Error('Cannot delete stage')));
  }

  render() {
    const { viewportSize, actualUser, course_data } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <CourseDashboardLayout
          course_data={course_data}
          deleteStage={this.deleteStage}
        />
      </Layout>
    );
  }
}

export default stage;
