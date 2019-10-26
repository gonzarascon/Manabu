import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Box,
  Heading,
  Form,
  Button,
  FormField,
  TextArea,
  Text,
  Select
} from 'grommet';
import { Book } from 'grommet-icons';

const FormWrapper = styled(Box)`
  max-width: 100%;
`;

const CustomForm = styled(Form)`
  max-width: 500px;
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
  return (
    <Box pad="medium" as="section">
      <Box direction="row" alignContent="center">
        <Book />
        <Heading level={3} margin={{ left: 'small' }}>
          Crea un nuevo curso.
        </Heading>
      </Box>
      <Box>
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
                <Select options={['rookie', 'champion', 'mega']} {...props} />
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
                  // eslint-disable-next-line react/no-children-prop
                  children={option => option.name}
                  multiple
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
