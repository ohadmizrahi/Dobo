import { useState } from 'react';
import { Alert } from 'react-native';
import { signUpValidationSchema } from '@Schemas/signupSchema';
import Form from '@Components/Form';
import { useNavigation } from '@react-navigation/native';
import { sendPostRequest } from '@Utils/request/send.js'; 
import { storeData } from '@Utils/storage/asyncStorage';
import { handleResponse } from '@Utils/response/handler';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const fields = [
    { name: 'fullName', label: 'Full Name', iconName: 'user', placeholder: 'Enter full name' },
    { name: 'email', label: 'Email', iconName: 'envelope', placeholder: 'Enter email', keyboardType: 'email-address' },
    { name: 'phoneNumber', label: 'Phone', iconName: 'mobile', placeholder: 'Enter phone number', keyboardType: 'numeric' },
    { name: 'address', label: 'Address', iconName: 'home', placeholder: 'Enter address' },
    { name: 'birthday', label: 'Birthday', iconName: 'gift', placeholder: 'Enter birthday', keyboardType: 'numeric' },
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
    { name: 'confirmPassword', label: 'Confirm Password', iconName: 'lock', placeholder: 'Confirm password', secureTextEntry: true },
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);

    const userInfo = {
      name: values.fullName,
      email: values.email,
      phone: values.phoneNumber,
      address: values.address,
      birthday: values.birthday,
      password: values.password,
    };

    const [day, month, year] = values.birthday.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    userInfo["birthday"] = formattedDate;

    try {
      const response = await sendPostRequest('api/auth/signup', userInfo);

      await handleResponse(response, navigation, async (data, error) => {
        await storeData('userToken', data.token);
        await storeData('userRefreshToken', data.tokenForRefresh);
        navigation.navigate('Profile');
      });
    }
     catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Form
      initialValues={{ fullName: '', email: '', phoneNumber: '', address: '', birthday: '', password: '', confirmPassword: '' }}
      validationSchema={signUpValidationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="SIGN UP"
      isLoading={isLoading}
      formName="Account"
      editable={true}
    />
  );
};

export default SignUpForm;

