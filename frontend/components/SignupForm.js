import React from 'react';
import { signUpValidationSchema } from '../schemas/signupSchema';
import Form from './Form';
import { fetchAPI } from '../util/fetch';


const { IP } = process.env;

const SignUpForm = () => {
  const fields = [
    { name: 'fullName', label: 'Full Name', iconName: 'user', placeholder: 'Enter full name' },
    { name: 'email', label: 'Email', iconName: 'envelope', placeholder: 'Enter email', keyboardType: 'email-address' },
    { name: 'phoneNumber', label: 'Phone', iconName: 'mobile', placeholder: 'Enter phone number', keyboardType: 'numeric' },
    { name: 'address', label: 'Address', iconName: 'home', placeholder: 'Enter address' },
    { name: 'birthday', label: 'Birthday', iconName: 'gift', placeholder: 'Enter birthday', keyboardType: 'numeric' },
    { name: 'password', label: 'Password', iconName: 'lock', placeholder: 'Enter password', secureTextEntry: true },
    { name: 'confirmPassword', label: 'Confirm Password', iconName: 'lock', placeholder: 'Confirm password', secureTextEntry: true },
  ];

  const onSubmit = async (values, { resetForm }) => {
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
      const { data, error } = await fetchAPI( 
        'http://10.100.102.51:3000/api/auth/signup',
        'POST', 
        { 'Content-Type': 'application/json' }, 
        userInfo 
      );

      if (data) {
        console.log('Response from server:', data);
        resetForm();
      } else {
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <Form
      initialValues={{ fullName: '', email: '', phoneNumber: '', address: '', birthday: '', password: '', confirmPassword: '' }}
      validationSchema={signUpValidationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="SIGN UP"
    />
  );
};

export default SignUpForm;
