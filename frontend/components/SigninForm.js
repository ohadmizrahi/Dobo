import React, { useState } from 'react';
import { Alert } from 'react-native';
import { signinValidationSchema } from '../schemas/signupSchema';
import Form from './Form';
import { fetchAPI } from '../util/fetch';
import { useNavigation } from '@react-navigation/native';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const fields = [
    { name: 'email', label: 'Email', iconName: 'envelope', placeholder: 'Enter email', keyboardType: 'email-address' },
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const { data } = await Promise.race([
        fetchAPI(
          'http://10.100.102.51:3000/api/auth/signin',
          'POST',
          { 'Content-Type': 'application/json' },
          { username: values.email, password: values.password }
        ),
        new Promise(( reject ) => {
          setTimeout(() => reject(new Error('Timeout')), 5000);
        })
      ]);

      setIsLoading(false);

      if (data) {
        Alert.alert('Welcome', 'You have successfully signed in.');
            navigation.navigate('Home');
      }
      else {
        Alert.alert('Wrong Email or Password', 'Please check your email and password and try again.');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
      
      if (error.message === 'Timeout') {
        Alert.alert('Error', 'No response received from the server. Please try again later.');
      }
      else {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validationSchema={signinValidationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="SIGN IN"
      isLoading={isLoading}
    />
  );
};

export default SignInForm;