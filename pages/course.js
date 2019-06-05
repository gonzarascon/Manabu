import React, { PureComponent } from 'react';
import Link from 'next/link';
import { Box } from 'grommet';

class Course extends PureComponent {
  static getInitialProps({ query: { id } }) {
    return { courseId: id };
  }

  render() {
    const { courseId } = this.props;
    return <Box>Course: {courseId}</Box>;
  }
}

export default Course;
