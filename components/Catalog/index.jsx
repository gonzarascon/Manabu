import React, { PureComponent } from 'react';
import Router from 'next/router';
import { Grid, Box, RadioButtonGroup, Heading } from 'grommet';
import CourseRow from '../CourseRow';

export default class Catalog extends PureComponent {
  constructor() {
    super();
    this.state = {
      value: 'Todos los lenguajes'
    };
  }

  render() {
    const { value } = this.state;
    const { searchedItem, coursesList, responsiveSize } = this.props;
    return (
      <Box fill="horizontal" pad={{ horizontal: 'xsmall' }}>
        <Heading
          level={2}
          color="gray1"
          margin={
            responsiveSize === 'small'
              ? { top: '50px', horizontal: 'auto' }
              : { vertical: '0', horizontal: 'auto' }
          }
        >
          Resultados para: &quot;{searchedItem}&quot;
        </Heading>
        <Grid
          columns={
            responsiveSize === 'small' ? ['1fr'] : ['.25fr', '1fr', '.25fr']
          }
          gap="large"
          fill="horizontal"
          justifyContent="center"
        >
          <Box
            gridColumn={responsiveSize === 'small' ? '1/1' : '2 / 3'}
            margin={{ vertical: 'large' }}
          >
            {coursesList.map(course => (
              <CourseRow
                name={course.name}
                user={course.person.username}
                href={`/course/${course.id}`}
              />
            ))}
          </Box>
          {/* <Box gridColumn="2/3" as="aside" pad="small">
            <Heading level={3} margin={{ bottom: 'small' }} color="gray1">
              Filtrar por lenguajes
            </Heading>
            <RadioButtonGroup
              name="language_filter"
              options={['Javascript', 'HTML', 'CSS', 'React']}
              value={value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Box> */}
        </Grid>
      </Box>
    );
  }
}
