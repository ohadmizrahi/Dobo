import * as yup from 'yup';

const paymentValidationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits")
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required('Card number is required'),
  expirationDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date. Use MM/YY format")
    .required('Expiration date is required'),
  cvv: yup
    .string()
    .min(3, "CVV must be 3 digits")
    .max(3, "CVV must be 3 digits")
    .matches(/^\d{3}$/, "CVV must be 3 digits")
    .required('CVV is required'),
  ID: yup
    .string()
    .min(9, "ID must be 9 digits")
    .max(9, "ID must be 9 digits")
    .required('ID is required'),
});

export { paymentValidationSchema };
