import * as yup from 'yup';

export const passwordValidationSchema = yup.object().shape({
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/,  "must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "must have a capital letter")
      .matches(/\d/, "must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "must have a special character")
      .min(8, ({ min }) => `must be at least ${min} characters`)
      .required('Password is required'),

  })