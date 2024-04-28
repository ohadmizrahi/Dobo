import { useState, useEffect } from 'react';
import Form from '@Components/Form';
import { getData } from '@Utils/storage/asyncStorage';
import { sendPostRequest } from '@Utils/request/send.js';
import { handleResponse } from '@Utils/response/handler';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {accountInfoValidationSchema} from '@Schemas/accountInfoSchema';
const AccountInfoForm = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(data);
  const navigation = useNavigation();

  useEffect(() => {
    setAccount(data);
  }, [data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fields = [
    { name: 'fullName', label: 'Full Name', iconName: 'user', placeholder: 'Enter full name' },
    { name: 'email', label: 'Email', iconName: 'envelope', placeholder: 'Enter email', keyboardType: 'email-address' },
    { name: 'phoneNumber', label: 'Phone', iconName: 'mobile', placeholder: 'Enter phone number', keyboardType: 'numeric' },
    { name: 'address', label: 'Address', iconName: 'home', placeholder: 'Enter address' },
    { name: 'birthday', label: 'Birthday', iconName: 'gift', placeholder: 'Enter birthday', keyboardType: 'numeric' },
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);

    const userInfo = {
      name: values.fullName,
      email: values.email,
      phone: values.phoneNumber,
      address: values.address,
      birthday: values.birthday,
    };

    try {
      const userToken = await getData('userToken');
      const response = await sendPostRequest('api/profile/update/account', userInfo, { userToken });
      console.log('Response:', response);
      await handleResponse(
        response,
        navigation,
        async (data, error) => {
            Alert.alert('Success', 'Your account information has been updated successfully.');
          navigation.navigate('Profile');
        }
      );
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'There was an error. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      initialValues={{
        fullName: account.fullname,
        email: account.email,
        phoneNumber: account.phonenumber,
        address: account.address,
        birthday: formatDate(account.birthdate),
      }}
      onSubmit={onSubmit}
      validationSchema={accountInfoValidationSchema}
      fields={fields}
      submitTitle="Submit"
      isLoading={isLoading}
      formName="Account"
      editable={false}
    />
  );
};

export default AccountInfoForm;
