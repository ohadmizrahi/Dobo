import React, { useState } from 'react';
import { signinValidationSchema } from '@Schemas/signupSchema';
import Form from './Form';
import { useNavigation } from '@react-navigation/native';

const JoinTableForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const fields = [
    { name: 'location', label: 'Location', iconName: 'map-marker', placeholder: 'Business Name' },
    { name: 'table', label: 'Table Code', iconName: 'cutlery', placeholder: 'Table Code' },
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);

  };

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validationSchema={signinValidationSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle="Join"
      isLoading={isLoading}
      formName="Join Table"
    />
  );
};

export default JoinTableForm;
