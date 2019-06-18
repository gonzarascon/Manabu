import React, { PureComponent } from 'react';
import { Grid, Box, RadioButtonGroup, Heading } from 'grommet';
import { CourseRow } from '..';

export default class Catalog extends PureComponent {
  constructor() {
    super();
    this.state = {
      value: 'Todos los lenguajes',
    };
  }

  render() {
    const { value } = this.state;
    return (
      <Box fill="horizontal" pad={{ horizontal: 'xsmall' }}>
        <Grid columns={['1fr', '.5fr']} gap="large" fill="horizontal">
          <Box gridColumn="1 / 2">
            <CourseRow />
            <CourseRow />
            <CourseRow />
            <CourseRow />
          </Box>
          <Box gridColumn="2/3" as="aside" pad="small">
            <Heading level={3} margin={{ bottom: 'small' }} color="gray1">
              Filtrar por lenguajes
            </Heading>
            <RadioButtonGroup
              name="language_filter"
              options={['Javascript', 'HTML', 'CSS', 'React']}
              value={value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Box>
        </Grid>
      </Box>
    );
  }
}
