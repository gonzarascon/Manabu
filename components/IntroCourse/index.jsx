import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Image, Text, Button, Heading, Paragraph } from 'grommet';

const gridColumns = ['1fr', '.75fr'];
const gridRows = ['xsmall', '1fr', '.7fr'];
const gridAreasMedium = [
  { name: 'courseTitle', start: [0, 0], end: [1, 0] },
  { name: 'courseImage', start: [0, 1], end: [0, 2] },
  { name: 'courseDescription', start: [1, 1], end: [1, 1] }
];

const gridAreasSmall = [
  { name: 'courseTitle', start: [0, 0], end: [1, 0] },
  { name: 'courseImage', start: [0, 1], end: [1, 1] },
  { name: 'courseDescription', start: [0, 2], end: [1, 2] }
];

class IntroCourse extends PureComponent {
  constructor(props) {
    super(props);
    const {
      courseData: {
        name,
        level,
        description,
        // eslint-disable-next-line camelcase
        course_photo,
        person: { username },
        languages
      }
    } = this.props;
    this.state = {
      title: name,
      description,
      course_photo,
      owner: username,
      level
    };
  }

  checkLevel(level) {
    switch (level) {
      case 'champion':
        return '250XP';
      case 'mega':
        return '500XP';
      default:
        return '100XP';
    }
  }

  render() {
    const { responsiveSize } = this.props;
    // TODO: Implementation for course_photo, owner & level
    const { title, description, course_photo, owner, level } = this.state;
    return (
      <Box
        maxWidth="1226px"
        margin={{ vertical: 'medium', horizontal: 'auto' }}
      >
        <Grid
          rows={gridRows}
          columns={gridColumns}
          areas={responsiveSize === 'small' ? gridAreasSmall : gridAreasMedium}
          gap="small"
          as="section"
          fill
        >
          <Heading as="h3" gridArea="courseTitle" color="gray1">
            {title}
          </Heading>

          <Box
            direction="column"
            gridArea="courseImage"
            height={responsiveSize === 'small' ? '350px' : 'auto'}
          >
            <Image src="/static/images/courseThumbnail.png" fit="contain" />
            <Text
              color="gray3"
              size="xlarge"
              margin={{ vertical: 'medium', horizontal: 'auto' }}
            >
              Con este curso sumas {this.checkLevel(level)}.
            </Text>
          </Box>

          <Box
            direction="column"
            pad="small"
            justify="center"
            gridArea="courseDescription"
          >
            <Paragraph
              color="gray1"
              size="large"
              margin={
                responsiveSize === 'small'
                  ? { vertical: 'small', horizontal: 'auto' }
                  : { vertical: 'large', horizontal: '0' }
              }
            >
              {description}
            </Paragraph>
            <Button label="Comenzar" primary />
          </Box>
        </Grid>
      </Box>
    );
  }
}

IntroCourse.propTypes = {
  responsiveSize: PropTypes.string.isRequired,
  courseData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default IntroCourse;
