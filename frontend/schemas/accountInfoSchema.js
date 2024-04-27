import * as yup from 'yup';

export const accountInfoValidationSchema = yup.object().shape({
    fullName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter at least 2 names')
      .required('Full name is required'),
    phoneNumber: yup
      .string()
      .matches(/(05)(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email is required'),
    address: yup
        .string()
        .required('Address is required'),
    birthday: yup
        .string()
        .min(10, 'Use DD/MM/YYYY format')
        .max(10, 'Use DD/MM/YYYY format')
        .required('Birthday is required'),
  })