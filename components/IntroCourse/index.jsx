import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Image, Text, Button, Heading } from 'grommet';

const gridColumns = ['1fr', '.75fr'];
const gridRows = ['xsmall', '1fr'];
const gridAreas = [
  { name: 'courseTitle', start: [0, 0], end: [1, 0] },
  { name: 'courseImage', start: [0, 1], end: [0, 1] },
  { name: 'courseDescription', start: [1, 1], end: [1, 1] },
];

class IntroCourse extends PureComponent {
  render() {
    return (
      <Box
        maxWidth="1226px"
        margin={{ vertical: 'medium', horizontal: 'auto' }}
      >
        <Grid
          rows={gridRows}
          columns={gridColumns}
          areas={gridAreas}
          gap="small"
          as="section"
          fill
        >
          <Heading as="h3" gridArea="courseTitle">
            JavaScript desde cero - Curso Inicial
          </Heading>

          <Box direction="column">
            <Image src="/static/images/courseThumbnail.png" />
            <Text
              color="gray3"
              size="xlarge"
              margin={{ vertical: 'medium', horizontal: 'auto' }}
            >
              Con este curso sumas 500XP en JavaScript
            </Text>
          </Box>
        </Grid>
      </Box>
    );
  }
}

export default IntroCourse;
