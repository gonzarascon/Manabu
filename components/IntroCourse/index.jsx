import React, { PureComponent } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Grid, Image, Text, Button, Heading, Paragraph } from 'grommet';

const gridColumns = ['1fr', '.75fr'];
const gridRows = ['xsmall', '1fr', '.7fr'];
const gridAreasMedium = [
  { name: 'courseTitle', start: [0, 0], end: [1, 0] },
  { name: 'courseImage', start: [0, 1], end: [0, 2] },
  { name: 'courseDescription', start: [1, 1], end: [1, 2] }
];

const gridAreasSmall = [
  { name: 'courseTitle', start: [0, 0], end: [1, 0] },
  { name: 'courseImage', start: [0, 1], end: [1, 1] },
  { name: 'courseDescription', start: [0, 2], end: [1, 2] }
];

function checkLevel(level) {
  switch (level) {
    case 'champion':
      return 'avanzada';
    case 'mega':
      return 'moderada';
    default:
      return 'basica';
  }
}
class IntroCourse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      course_photo: '',
      owner: '',
      level: '',
      id: 0,
      totalStages: 0
    };
  }

  componentDidMount() {
    const { courseData } = this.props;
    if (!_.isEqual(courseData, {})) {
      const {
        name,
        level,
        description,
        id,
        course_photo,
        person: { username },
        languages,
        stages
      } = courseData;
      this.setState({
        title: name,
        description,
        course_photo,
        owner: username,
        level,
        id,
        totalStages: stages.length
      });
    }
  }

  render() {
    const {
      responsiveSize,
      loggedUserData: { id: user_id },
      takeCourse
    } = this.props;
    const {
      title,
      description,
      course_photo,
      owner,
      level,
      id,
      totalStages
    } = this.state;
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
            {title} <Text weight={200}> - de {owner}</Text>
          </Heading>

          <Box
            direction="column"
            gridArea="courseImage"
            height={responsiveSize === 'small' ? '350px' : 'auto'}
          >
            <Image src="/static/images/courseThumbnail.png" fit="contain" />
            {/* <Text
              color="gray3"
              size="xlarge"
              margin={{ vertical: 'medium', horizontal: 'auto' }}
            >
              Con este curso sumas {checkLevel(level)}.
            </Text> */}
          </Box>

          <Box
            direction="column"
            pad="small"
            justify="center"
            gridArea="courseDescription"
          >
            <Heading level={3} color="gray1">
              Sobre este curso
            </Heading>
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
            <Text color="gray1" margin={{ vertical: 'small' }}>
              La dificultad de este curso es {checkLevel(level)}
            </Text>
            <Text color="gray1" margin={{ vertical: 'small' }}>
              Este curso contiene un total de {totalStages} clases.
            </Text>
            <Button
              label="Comenzar"
              primary
              onClick={() => takeCourse(`/course/${id}/take/${user_id}`)}
            />
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
