import React, { PureComponent } from 'react';
import { IntroCourse } from 'components';

class Course extends PureComponent {
  static async getInitialProps({ query: { courseData } }) {
    const res = await courseData;
    return { courseData: res };
  }

  render() {
    const { courseData, viewportSize } = this.props;
    return (
      <IntroCourse responsiveSize={viewportSize} courseData={courseData} />
    );
  }
}

export default Course;
