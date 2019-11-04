import React, { useState } from 'react';
import Router from 'next/router';
import { Heading, Box, Grid, Text, Anchor, Layer, Button } from 'grommet';
import { AddCircle, Trash } from 'grommet-icons';

import {
  Wrapper,
  AddButton,
  StageBox,
  AdviceBox,
  DeleteButton
} from './styles';
import Link from 'next/link';

function renderStages(stages, course_id, handleDelete) {
  return stages.map((stage, index) => (
    <StageBox>
      <DeleteButton
        icon={<Trash color="status-critical" />}
        hoverIndicator
        onClick={() => handleDelete(stage)}
      />
      <Link href={`/course/${course_id}/edit/stage/${stage.id}`}>
        <Anchor label={`Clase ${stage.number}`} size="large" />
      </Link>
    </StageBox>
  ));
}

function CourseDashboardLayout({ course_data, deleteStage }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [stageToDelete, setStageToDelete] = useState({});

  function handleDelete(stage) {
    setStageToDelete(stage);
    setDeleteMode(true);
  }

  function deleteAlert() {
    const { number, id } = stageToDelete;
    return (
      <Layer
        animation
        onEsc={() => setDeleteMode(false)}
        onClickOutside={() => setDeleteMode(false)}
      >
        <Box pad="medium">
          <Heading level={3} textAlign="center">
            Estas a punto de eliminar la clase {number} <br />
            ¿Estas seguro?
          </Heading>
          <Box
            direction="row"
            justify="around"
            margin={{ vertical: 'medium' }}
            width="medium"
            alignSelf="center"
          >
            <Button
              label="Eliminar"
              color="status-critical"
              onClick={() => deleteStage(id)}
            />
            <Button label="Cancelar" onClick={() => setDeleteMode(false)} />
          </Box>
        </Box>
      </Layer>
    );
  }

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
          {renderStages(stages, id, handleDelete)}
        </Grid>
      </Box>
      {deleteMode && deleteAlert()}
    </Wrapper>
  );
}

export default CourseDashboardLayout;
