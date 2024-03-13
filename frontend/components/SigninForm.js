import React from 'react';
import { signinValidationSchema } from '../schemas/signupSchema';
import Form from './Form';

const SignInForm = () => {
  const fields = [
    { name: 'email', label: 'Email', iconName: 'envelope', placeholder: 'Enter email', keyboardType: 'email-address' },
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
  ];

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validationSchema={signinValidationSchema}
      onSubmit={(values) => console.log(values)}
      fields={fields}
      submitTitle="LOGIN"
    />
  );
};

export default SignInForm;