import React from 'react';
import { paymentValidationSchema } from '@Schemas/paymentSchema';
import Form from '@Components/Form';

const PaymentForm = ({paymentDetails}) => {

  
  const fields = [
    { name: 'cardNumber', label: 'Card Number', iconName: 'cc-visa', placeholder: 'Enter card number', keyboardType: 'numeric',secureTextEntry: true },
    { name: 'expirationDate', label: 'Expiration Date', iconName: 'calendar', placeholder: 'MM/YY', keyboardType: 'numeric'},
    { name: 'cvv', label: 'CVV', iconName: 'lock', placeholder: 'Enter CVV', keyboardType: 'numeric',secureTextEntry: true },
    { name: 'ID', label: 'ID', iconName: 'id-card-o', placeholder: 'Enter ID', keyboardType: 'numeric' },
  ];

  return (
    <Form
      initialValues={paymentDetails ? paymentDetails : {}}
      validationSchema={paymentValidationSchema}
      onSubmit={(values) => console.log(values)}
      fields={fields}
      submitTitle="Pay Now"
      formName="Payment"
    />
  );
  
};

export default PaymentForm;