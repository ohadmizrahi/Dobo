import React, { useState } from 'react';
import { signinValidationSchema } from '@Schemas/signupSchema';
import Form from '@Components/Form';
import { useNavigation } from '@react-navigation/native';

const JoinTableForm = ({ qrData , navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({location: '', table: ''});
  const [qrObject, setQrObject] = useState(qrData ? JSON.parse(qrData) : null);

  const fields = [
    { name: 'location', label: 'Location', iconName: 'map-marker', placeholder: 'Business Name' },
    { name: 'table', label: 'Table Code', iconName: 'cutlery', placeholder: 'Table Code' },
  ];

  if (qrObject) {
    const business = qrObject.business.toString()
    const table = qrObject.table.toString()
    setInitialValues({location: business, table: table});
    setQrObject(null);
  }

  const onSubmit = async (values) => {
    setIsLoading(true);
    
    // Submit logic goes here
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="Join"
      isLoading={isLoading}
      formName="Join Table"
    />
  );
};

export default JoinTableForm;
