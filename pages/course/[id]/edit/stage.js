import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Layout, EditStageLayout } from 'components';

class stage extends PureComponent {
  static async getInitialProps({ query }) {
    const { course_id, stageData } = await query;

    return { course_id, stageData };
  }

  constructor() {
    super();

    this.sendSaveStage = this.sendSaveStage.bind(this);
    this.sendUpdateStage = this.sendUpdateStage.bind(this);
  }

  async sendSaveStage(stageData) {
    const { access_token, course_id } = this.props;
    await axios
      .post(
        `/course/${course_id}/create/stage`,
        { value: stageData },
        { params: { access_token } }
      )
      .then(() => Router.replace(`/course/${course_id}/edit/dashboard`))
      .catch(error => console.log('error redirecting'));
  }

  async sendUpdateStage(_stageData) {
    const { access_token, course_id, stageData } = this.props;
    await axios
      .put(
        `/course/${course_id}/update/stage/${stageData.id}`,
        { value: _stageData },
        { params: { access_token } }
      )
      .then(() => Router.replace(`/course/${course_id}/edit/dashboard`))
      .catch(error => console.log('error redirecting'));
  }

  render() {
    const { viewportSize, actualUser, course_id, stageData } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <EditStageLayout
          course_id={course_id}
          sendSaveStage={this.sendSaveStage}
          stageLoadedData={stageData}
          sendUpdateStage={this.sendUpdateStage}
        />
      </Layout>
    );
  }
}

export default stage;
