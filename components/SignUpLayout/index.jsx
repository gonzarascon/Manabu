import React, { useState } from 'react';
import Router from 'next/router';
import validator from 'validator';
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
    user_type: ''
  });

  const [formError, setFormError] = useState({
    username: false,
    password: false,
    email: false,
    user_type: false
  });

  const [userTypeView, setUserTypeView] = useState('');

  function checkFormFields() {
    if (validator.isEmpty(formValue.username))
      setFormError({ ...formError, username: true });
    if (!validator.isLength(formValue.password, { min: 6, max: undefined }))
      setFormError({ ...formError, password: true });
    if (!validator.isEmail(formValue.email))
      setFormError({ ...formError, email: true });
    if (validator.isEmpty(formValue.user_type))
      setFormError({ ...formError, user_type: true });

    if (
      !validator.isEmpty(formValue.username) &&
      validator.isLength(formValue.password, { min: 6, max: undefined }) &&
      validator.isEmail(formValue.email) &&
      !validator.isEmpty(formValue.user_type)
    )
      handleSignUpForm(formValue);
  }
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
            checkFormFields();
          }}
          errors={formError}
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
            onChange={event => {
              setFormValue({ ...formValue, username: event.target.value });
              setFormError({ ...formError, username: false });
            }}
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
            onChange={event => {
              setFormValue({ ...formValue, email: event.target.value });
              setFormError({ ...formError, email: false });
            }}
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
            help="Debe contener, por lo menos, 6 caracteres."
            onChange={event => {
              setFormValue({ ...formValue, password: event.target.value });
              setFormError({ ...formError, password: false });
            }}
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
                  { value: 'teacher', label: 'Profesor' }
                ]}
                labelKey={o => {
                  return o.label;
                }}
                value={userTypeView}
                placeholder="Selecciona el tipo de usuario"
                onChange={({ option }) => {
                  setUserTypeView(option.label);
                  setFormValue({ ...formValue, user_type: option.value });
                  setFormError({ ...formError, user_type: false });
                  return null;
                }}
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
