import React, { useState } from 'react';
import { Alert } from 'react-native';
import { signinValidationSchema } from '@Schemas/signupSchema';
import Form from '@Components/Form';
import { useNavigation } from '@react-navigation/native';
import { sendPostRequest } from '@Utils/request/send.js';
import { storeData, getAllData } from '@Utils/storage/asyncStorage';
import { handleResponse } from '@Utils/response/handler';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const fields = [
    { name: 'email', label: 'Email', iconName: 'envelope', placeholder: 'Enter email', keyboardType: 'email-address' },
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);

    const userInfo = {
      username: values.email.toLowerCase(),
      password: values.password,
    };
    console.log('user',userInfo);
    try {
      const response = await sendPostRequest('api/auth/signin', userInfo);

      await handleResponse(response, navigation, async (data) => {
        await storeData('userToken', data.token);
        await storeData('userRefreshToken', data.tokenForRefresh);
        navigation.navigate('Profile');
      });

    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validationSchema={signinValidationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="SIGN IN"
      isLoading={isLoading}
      formName="Sign In"
      editable={true}
    />
  );
};

export default SignInForm;
