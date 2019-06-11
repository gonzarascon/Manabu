import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Image, Text, Button, Heading, Paragraph } from 'grommet';

const gridColumns = ['1fr', '.75fr'];
const gridRows = ['xsmall', '1fr', '.7fr'];
const gridAreasMedium = [
  { name: 'courseTitle', start: [0, 0], end: [1, 0] },
  { name: 'courseImage', start: [0, 1], end: [0, 2] },
  { name: 'courseDescription', start: [1, 1], end: [1, 1] },
];

const gridAreasSmall = [
  { name: 'courseTitle', start: [0, 0], end: [1, 0] },
  { name: 'courseImage', start: [0, 1], end: [1, 1] },
  { name: 'courseDescription', start: [0, 2], end: [1, 2] },
];

class IntroCourse extends PureComponent {
  render() {
    const { responsiveSize } = this.props;
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
            JavaScript desde cero - Curso Inicial
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
              Con este curso sumas 500XP en JavaScript
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
                  : { vertical: 'large', horizontal: 'auto' }
              }
            >
              Aprende las bases de JavaScript, el lenguaje de programación de la
              web. En este curso verás variables, arreglos, funciones y otros
              métodos básicos del lenguaje.
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
};

export default IntroCourse;
