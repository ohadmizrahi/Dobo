import React from 'react';
// import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
// import { Formik } from 'formik';
// import { Picker } from '@react-native-picker/picker';
import Form from './Form';

const TableReservationForm = () => {
  const fields = [
    {name: 'date', label: 'Pick date', iconName: 'calendar', placeholder: 'Reservation Date', Keyboardtype: 'date'},
    {name: 'tableSize', label: 'TableSize', iconName: 'user', placeholder: 'Number Of Pepole'},
    {name: 'hour', label: 'Hour', iconName: 'clock-o', placeholder: 'Reservation Hour', Keyboardtype: 'time'},
    {name: 'preference',iconName: 'gear', label: 'Preference (optional)', placeholder: 'Preference'},
    {name: 'specialRequest',iconName: 'gear', label: 'SpecialRequest (optional)', placeholder: 'Special Request'},
  ]
  const initialValues = {
    date: '',
    tableSize: '',
    hour: '',
    preference: '',
    specialRequest: '',
  };

  const onSubmit = (values) => {
    console.log('Reservation submitted:', values);
    // Handle form submission here (e.g., send data to server)
  };

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} fields={fields} submitsubmitTitle = 'Send Reservation' />
  );
};

export default TableReservationForm;
