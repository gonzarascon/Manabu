import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Layout, TakeStageLayout } from 'components';

class stage extends PureComponent {
  static async getInitialProps({ query }) {
    const { course_id, stageData, courseData } = await query;
    console.log('coursedata gip', courseData);
    return { course_id, stageData: stageData[0], courseData };
  }

  constructor() {
    super();

    this.checkStageDataWithUserInput = this.checkStageDataWithUserInput.bind(
      this
    );
  }

  checkStageDataWithUserInput(userInput) {
    const {
      stageData: {
        content: {
          formValue: { correct_answer }
        },
        number
      },
      courseData
    } = this.props;
    if (userInput === correct_answer) {
      if (number + 1 < courseData.stages.length) {
        // TODO: Router should push to next stage
        console.log('next stage');
        // TODO: Router should push to end
      } else {
        console.log('course end');
      }
    }
  }

  render() {
    const { viewportSize, actualUser, course_id, stageData } = this.props;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <TakeStageLayout
          course_id={course_id}
          stageLoadedData={stageData}
          checkUserInput={this.checkStageDataWithUserInput}
        />
      </Layout>
    );
  }
}

export default stage;
