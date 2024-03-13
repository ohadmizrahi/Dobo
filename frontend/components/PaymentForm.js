import React from 'react';
import { paymentValidationSchema } from '../schemas/paymentSchema';
import Form from './Form';

const PaymentForm = () => {
  const fields = [
    { name: 'cardNumber', label: 'Card Number', iconName: 'cc-visa', placeholder: 'Enter card number', keyboardType: 'numeric' },
    { name: 'expirationDate', label: 'Expiration Date', iconName: 'calendar', placeholder: 'MM/YY', keyboardType: 'numeric' },
    { name: 'cvv', label: 'CVV', iconName: 'lock', placeholder: 'Enter CVV', keyboardType: 'numeric' },
    { name: 'ID', label: 'ID', iconName: 'id-card-o', placeholder: 'Enter ID', keyboardType: 'numeric' },
  ];

  return (
    <Form
      initialValues={{ cardNumber: '', expirationDate: '', cvv: '', ID: '' }}
      validationSchema={paymentValidationSchema}
      onSubmit={(values) => console.log(values)}
      fields={fields}
      submitTitle="Pay"
    />
  );
};

export default PaymentForm;