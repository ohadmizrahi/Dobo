import { useState, useEffect } from 'react';
import Form from '@Components/Form';
import { getData, storeData } from '@Utils/storage/asyncStorage';
import { sendPostRequest } from '@Utils/request/send.js';
import { handleResponse } from '@Utils/response/handler';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {accountInfoValidationSchema} from '@Schemas/accountInfoSchema';

const keysMap = {
  fullName: 'fullname',
  email: 'email',
  phoneNumber: 'phonenumber',
  address: 'address',
  birthDate: 'birthdate',
}

const AccountInfoForm = ({ data, handleUpdateProfile }) => {
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
      fullName: values.fullName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      birthDate: values.birthday.replace(/\//g, '-').split('-').reverse().join('-')
    };

    try {
      const userToken = await getData('userToken');
      const response = await sendPostRequest('api/profile/update/account', userInfo, { userToken });
      
      await handleResponse(
        response,
        navigation,
        async (data, error) => {
            Alert.alert('Success', 'Your account information has been updated successfully.');
            const updatedFields = Object.keys(data.updatedFields).reduce((acc, key) => {
              
              acc[keysMap[key]] = data.updatedFields[key];
              return acc;
            }, { ...account });

            handleUpdateProfile((prevProfile) => ({ ...prevProfile, account: {...prevProfile.account, ...updatedFields} }));

            const account = await getData('account');
            await storeData('account', {...JSON.parse(account), ...updatedFields});
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
