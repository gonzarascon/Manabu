import React, { useState } from 'react';
import Router from 'next/router';
import _ from 'lodash';
import axios from 'axios';
import { Box, Heading, Form, FormField, Text, Select, Button } from 'grommet';

function handleSignUpForm(formValue) {
  if (!_.some(formValue, _.isEmpty))
    axios
      .post('/user/create', { formValue })
      .then(() => Router.replace('/'))
      .catch(error => console.error(error));
}

const SignUpLayout = () => {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
    email: '',
    user_type: '',
  });

  return (
    <Box fill margin={{ vertical: '0', horizontal: 'auto' }} maxWidth="80%">
      <Heading
        level={2}
        textAlign="center"
        alignSelf="center"
        color="gray1"
        size="large"
      >
        Crea tu cuenta
      </Heading>
      <Box
        maxWidth="30%"
        fill
        margin={{ top: '25px', bottom: '0', horizontal: 'auto' }}
      >
        <Form
          onSubmit={() => {
            handleSignUpForm(formValue);
          }}
        >
          <FormField
            label={
              <Text textAlign="left" as="label">
                Nombre de usuario
              </Text>
            }
            name="username"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            focusIndicator
            onChange={event =>
              setFormValue({ ...formValue, username: event.target.value })
            }
          />
          <FormField
            label={
              <Text textAlign="left" as="label">
                Email
              </Text>
            }
            name="email"
            type="email"
            placeholder="Ingresa tu email"
            focusIndicator
            onChange={event =>
              setFormValue({ ...formValue, email: event.target.value })
            }
          />
          <FormField
            label={
              <Text textAlign="left" as="label">
                Contraseña
              </Text>
            }
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            focusIndicator
            onChange={event =>
              setFormValue({ ...formValue, password: event.target.value })
            }
          />
          <FormField
            label={
              <Text textAlign="left" as="label">
                Tipo de usuario
              </Text>
            }
            name="user_type"
            component={() => (
              <Select
                options={[
                  { value: 'student', label: 'Estudiante' },
                  { value: 'teacher', label: 'Profesor' },
                ]}
                labelKey="label"
                value={formValue.user_type}
                placeholder="Selecciona el tipo de usuario"
                onChange={({ option }) =>
                  setFormValue({ ...formValue, user_type: option.value })
                }
              />
            )}
            focusIndicator
          />

          <Button
            type="submit"
            label="Registrarme"
            margin={{ vertical: '30px', horizontal: 'auto' }}
            dsp="block"
          />
        </Form>
      </Box>
    </Box>
  );
};

export default SignUpLayout;
