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

function CreateCourseLayout({ handleInput, values, languages }) {
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
          <CustomForm>
            <FormField
              name="name"
              label="Nombre del curso"
              value={values.courseName}
              onChange={e => handleInput('courseName', e.target.value)}
            />
            <Box>
              <Text>Descripción</Text>
              <TextArea
                value={values.courseDescription}
                onChange={e => handleInput('courseDescription', e.target.value)}
              />
            </Box>
            <Box>
              <Text>¿Cual es la dificultad de este curso?</Text>
              <Select
                options={['rookie', 'champion', 'mega']}
                value={values.courseLevel}
                onChange={({ option }) => handleInput('courseLevel', option)}
              />
            </Box>
            <Box>
              <Text>¿Que aprenderán tus estudiantes?</Text>
              <Select
                options={languages}
                // eslint-disable-next-line react/no-children-prop
                children={option => option.name}
                multiple
                onSearch={e => console.log('search', e)}
                onChange={({ option }) => console.log('option', option)}
              />
            </Box>
          </CustomForm>
          <CreateButton type="submit" label="Crear curso" />
        </FormWrapper>
      </Box>
    </Box>
  );
}
export default CreateCourseLayout;
