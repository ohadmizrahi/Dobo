import React, { useState } from 'react';
import { Alert } from 'react-native';
import { signinValidationSchema } from '../schemas/signupSchema';
import Form from './Form';
import { fetchAPI } from '../util/fetch';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const fields = [
    { name: 'email', label: 'Email', iconName: 'envelope', placeholder: 'Enter email', keyboardType: 'email-address' },
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
  ];

  const onSubmit = async (values, { resetForm }) => {
    setIsLoading(true); // Set loading state to true

    try {
      // Perform the fetch request
      const { data, error } = await Promise.race([
        fetchAPI(
          'http://172.20.10.4:3000/api/auth/signin', // URL
          'POST', // Method
          { 'Content-Type': 'application/json' }, // Headers
          { username: values.email, password: values.password } // Body
        ),
        new Promise((resolve, reject) => {
          // Reject the promise if no response is received within 10 seconds
          setTimeout(() => reject(new Error('Timeout')), 5000); // Adjust the timeout duration as needed
        })
      ]);

      setIsLoading(false); // Set loading state to false

      if (data) {
        console.log('Authentication successful:', data);
        // Do something with the token or navigate to another page
      } else {
        console.error('Authentication failed:', error);
        // Display an alert when authentication fails
        Alert.alert('Wrong Email or Password', 'Please check your email and password and try again.');
      }
    } catch (error) {
      setIsLoading(false); // Set loading state to false
      console.error('Error:', error);

      if (error.message === 'Timeout') {
        // Handle timeout error
        Alert.alert('Error', 'No response received from the server. Please try again later.');
      } else {
        // Handle other errors
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
      submitTitle="LOGIN"
    />
  );
};

export default SignInForm;
