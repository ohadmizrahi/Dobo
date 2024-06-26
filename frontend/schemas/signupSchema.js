import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
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
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/,  "must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "must have a capital letter")
      .matches(/\d/, "must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "must have a special character")
      .min(8, ({ min }) => `must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  })