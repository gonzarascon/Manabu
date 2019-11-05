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

    this.checkStageDataWithUserInput = this.checkStageDataWithUserInput.bind(
      this
    );
  }

  checkStageDataWithUserInput(userInput) {
    console.log('userInput', userInput);
  }

  render() {
    const { viewportSize, actualUser, course_id, stageData } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <EditStageLayout
          course_id={course_id}
          stageLoadedData={stageData}
          checkUserInput={this.checkStageDataWithUserInput}
        />
      </Layout>
    );
  }
}

export default stage;
