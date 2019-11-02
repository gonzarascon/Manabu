import React, { useState } from 'react';
import Router from 'next/router';
import { Heading, Box, Grid, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

import { Wrapper, AddButton, StageBox, AdviceBox } from './styles';

function renderStages(stages) {
  return stages.map((stage, index) => (
    <StageBox>
      <Text>Clase {index + 1}</Text>
    </StageBox>
  ));
}

function CourseDashboardLayout({ course_data }) {
  console.log('course data', course_data);
  const { name, stages, id } = course_data;
  return (
    <Wrapper>
      <Heading level={3} color="gray1" margin="medium">
        Editar Curso:{' '}
        <Text truncate weight={200} size="large">
          {name}{' '}
        </Text>
      </Heading>
      <Box as="section" height="75vh" margin="medium">
        {stages.length < 1 && (
          <AdviceBox
            justifyContent="center"
            pad="medium"
            margin={{ vertical: 'medium' }}
          >
            <Text size="medium">
              Aun no has creado una clase para este curso. <br />
              Comienza haciendo click en <AddCircle size="medium" />
            </Text>
          </AdviceBox>
        )}
        <Grid gap="small" columns="small" rows="small" fill>
          <AddButton
            icon={<AddCircle size="large" />}
            label="Agregar una clase"
            hoverIndicator
            onClick={() => Router.push(`/course/${id}/edit/stage`)}
          />
          {renderStages(stages)}
        </Grid>
      </Box>
    </Wrapper>
  );
}

export default CourseDashboardLayout;
