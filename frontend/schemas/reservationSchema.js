import * as yup from 'yup';

export const tableReservationValidationSchema = yup.object().shape({
  date: yup
    .string()
    .min(10, 'Use DD/MM/YYYY format')
    .max(10, 'Use DD/MM/YYYY format')
    .required('Reservation Date is required'),
  tableSize: yup
    .number()
    .required('Table Size is required')
    .positive('Table Size must be a positive number')
    .integer('Table Size must be an integer'),
  hour: yup
    .string()
    .min(5, 'Use HH:MM format')
    .max(5, 'Use HH:MM format')
    .required('Reservation Hour is required'),
  preference: yup
    .string(),
  specialRequest: yup
    .string(),
});

