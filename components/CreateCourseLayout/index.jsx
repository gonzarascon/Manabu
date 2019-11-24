import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Heading,
  Form,
  Button,
  FormField,
  TextArea,
  Select
} from 'grommet';
import { Book } from 'grommet-icons';
import { parse } from 'path';

const FormWrapper = styled(Box)`
  max-width: 100%;
  align-items: center;
`;

const CustomForm = styled(Form)`
  max-width: 700px;
  width: 100%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  label {
    margin-left: 0;
  }
`;

const CreateButton = styled(Button)`
  max-width: 200px;
`;

function CreateCourseLayout({
  handleInput,
  values,
  languages,
  creationHandler
}) {
  function localizeLevel(level) {
    switch (level) {
      case 'rookie':
        return 'Fácil';
      case 'champion':
        return 'Media';
      default:
        return 'Difícil';
    }
  }

  function capitalize(string) {
    const parsedString = String(string);
    const uppercasedInitial = parsedString[0].toUpperCase();
    return uppercasedInitial + parsedString.slice(1);
  }

  return (
    <Box pad="large" as="section" animation="fadeIn" height=" 70vh">
      <Box direction="row" alignContent="center" justify="center">
        <Book />
        <Heading level={3} margin={{ left: 'small' }} color="gray1">
          Crea un nuevo curso.
        </Heading>
      </Box>
      <Box margin={{ top: 'medium' }} alignContent="center">
        <FormWrapper>
          <CustomForm onSubmit={({ value }) => creationHandler(value)}>
            <FormField
              name="name"
              label="Nombre del curso"
              value={values.courseName}
              onChange={e => handleInput('courseName', e.target.value)}
            />
            <FormField
              name="description"
              label="Descripción"
              value={values.courseDescription}
              onChange={e => handleInput('courseDescription', e.target.value)}
              component={TextArea}
            />

            <FormField
              label="¿Cual es la dificultad de este curso?"
              name="level"
              value={values.courseLevel}
              onChange={({ option }) => handleInput('courseLevel', option)}
              component={props => (
                <Select
                  labelKey="label"
                  value="value"
                  options={[
                    {
                      value: 'rookie',
                      label: localizeLevel('rookie')
                    },
                    {
                      value: 'champion',
                      label: localizeLevel('champion')
                    },
                    {
                      value: 'mega',
                      label: localizeLevel('mega')
                    }
                  ]}
                  {...props}
                />
              )}
            />
            <FormField
              label="¿Que aprenderán tus estudiantes?"
              name="languages"
              onChange={({ option }) => console.log('option', option)}
              value={values.courseLanguages}
              component={props => (
                <Select
                  options={languages}
                  labelKey={option => capitalize(option.name)}
                  onSearch={e => console.log('search', e)}
                  {...props}
                />
              )}
            />
            <CreateButton type="submit" label="Crear curso" />
          </CustomForm>
        </FormWrapper>
      </Box>
    </Box>
  );
}
export default CreateCourseLayout;
