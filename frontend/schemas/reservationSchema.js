import * as yup from 'yup';

export const tableReservationValidationSchema = yup.object().shape({
  date: yup
    .date()
    .required('Reservation Date is required'),
  tableSize: yup
    .number()
    .required('Table Size is required')
    .positive('Table Size must be a positive number')
    .integer('Table Size must be an integer'),
  hour: yup
    .string()
    .required('Reservation Hour is required'),
  preference: yup
    .string(),
  specialRequest: yup
    .string(),
});

