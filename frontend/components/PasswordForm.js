import React, { useState } from 'react';
import Form from './Form';
import { useNavigation } from '@react-navigation/native';

const PasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const [password, setPassword] = useState('123456Or!');

  const updatePassword = (password) => {
    setPassword(password);
  };

  const fields = [
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);

  };

  return (
    <Form
      initialValues={password ? { password } : {}}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="Reset"
      isLoading={isLoading}
      formName="Sign In"
    />
  );
};

export default PasswordForm;
