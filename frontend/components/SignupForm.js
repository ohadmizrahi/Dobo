import React from 'react';
import { signUpValidationSchema } from '../schemas/signupSchema';
import Form from './Form';

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
    const stam={
      name: values.fullName,
      email: values.email,
      phone: values.phoneNumber,
      address: values.address,
      birthday: values.birthday,
      password: values.password,
    }
    const [day, month, year] = values.birthday.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    stam["birthday"] = formattedDate;
    try {
      const response = await fetch('http://10.100.102.51:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(stam),
      });
      const data = await response.json(); // Extract JSON data from response
      console.log('Response from server:', data);
      // if (response.ok) {
      //   const data = await response.json();
      //   console.log('Response from server:', data);
      //   resetForm();
      // } else {
      //   throw new Error('Error: ' + response.statusText);
      // }
    } catch (error) {
      console.log("hi ohad")
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
