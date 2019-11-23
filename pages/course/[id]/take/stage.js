import React, { PureComponent, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Layout, TakeStageLayout } from 'components';
import { user } from '../../../../api/';

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

  async checkStageDataWithUserInput(userInput) {
    const {
      stageData: {
        content: {
          formValue: { correct_answer }
        },
        number
      },
      courseData,
      course_id,
      loggedUserData: { id: userId }
    } = this.props;

    if (userInput === correct_answer) {
      const totalStages = courseData.stages.length;
      if (number < totalStages && number + 1 <= totalStages) {
        // TODO: Router should push to next stage
        user
          .updateCourseProgress(userId, course_id, number + 1)
          .then(response =>
            Router.replace(`/course/${course_id}/take/stage/${number + 1}`)
          )
          .catch(error => console.error('no se pudo continuar el curso'));
        // TODO: Router should push to end
      } else {
        Router.replace(`/course/${course_id}/end`);

        // console.log('courseData stages', courseData.stages);
        // console.log('course end');
      }
    }
  }

  render() {
    const {
      viewportSize,
      actualUser,
      course_id,
      stageData,
      courseData
    } = this.props;
    const courseLength = courseData.stages.length;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        <TakeStageLayout
          course_id={course_id}
          stageLoadedData={stageData}
          checkUserInput={this.checkStageDataWithUserInput}
          totalStages={courseLength}
        />
      </Layout>
    );
  }
}

export default stage;
