import React, { useState } from 'react';
import Router from 'next/router';
import { Heading, Box, Grid, Text, Anchor, Layer, Button } from 'grommet';
import { AddCircle, Trash, CheckboxSelected, Alert } from 'grommet-icons';
import Link from 'next/link';

import {
  Wrapper,
  AddButton,
  StageBox,
  AdviceBox,
  DeleteButton,
  PublishButton
} from './styles';

function renderStages(stages, course_id, handleDelete) {
  return stages.map((stage, index) => (
    <StageBox key={stage.id}>
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

function CourseDashboardLayout({
  course_data,
  deleteStage,
  toggleState,
  responsiveSize
}) {
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

  const { name, stages, id, state } = course_data;

  function renderCourseState() {
    return (
      <Text color={state === 'inactive' ? 'status-critical' : 'neutral-1'}>
        {state === 'inactive' ? 'No publicado' : 'Publicado'}
      </Text>
    );
  }

  return (
    <Wrapper>
      <Box
        justify="between"
        direction={responsiveSize === 'small' ? 'column' : 'row'}
        align="center"
        margin="medium"
      >
        <Heading level={3} color="gray1">
          Editar Curso:{' '}
          <Text truncate weight={200} size="large">
            {name}{' '}
          </Text>
        </Heading>

        <Heading level={5} color="gray1">
          Estado del curso: {renderCourseState()}
        </Heading>
      </Box>
      <Box
        as="section"
        height={responsiveSize === 'small' ? 'auto' : '75vh'}
        margin="medium"
      >
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
      <PublishButton
        margin="medium"
        icon={
          state === 'inactive' ? (
            <CheckboxSelected size="medium" color="white" />
          ) : (
            <Alert size="medium" color="white" />
          )
        }
        label={state === 'inactive' ? 'Publicar Curso' : 'Desactivar Curso'}
        onClick={() => {
          toggleState(state === 'inactive' ? 'active' : 'inactive');
        }}
      />
      {deleteMode && deleteAlert()}
    </Wrapper>
  );
}

export default CourseDashboardLayout;
