import * as yup from 'yup';

export const schema = yup.object().shape({
    fullName: yup.string().required('Your Full Name is required'),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(10).max(10).required(),
    address: yup.string().required(),
    birthDate: yup.string().required(),
    image: yup.string(),
    password: yup.string().min(8).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required(),
});