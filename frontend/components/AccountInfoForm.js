import React, { useState, useEffect } from 'react';
import Form from '@Components/Form';
import { useNavigation } from '@react-navigation/native';

const AccountInfoForm = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState(data);

  useEffect(() => {
    setAccount(data);
  }, [data]);


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
  };

  return (
    <Form
      initialValues={ {
        fullName: account.fullname,
        email: account.email,
        phoneNumber: account.phonenumber,
        address: account.address,
        birthday: account.birthdate,
      } }
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="Edit"
      isLoading={isLoading}
      formName="Account"
    />
  );
};

export default AccountInfoForm;
