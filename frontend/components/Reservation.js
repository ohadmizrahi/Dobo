import React from 'react';
import { TableReservationFormSchema } from '@Schemas/reservationSchema';
import Form from '@Components/Form';

const TableReservationForm = () => {
  const fields = [
    {name: 'date', label: 'Pick date', iconName: 'calendar', placeholder: 'Reservation Date', Keyboardtype: 'date'},
    {name: 'tableSize', label: 'TableSize', iconName: 'user', placeholder: 'Number Of Pepole'},
    {name: 'hour', label: 'Hour', iconName: 'clock-o', placeholder: 'Reservation Hour', Keyboardtype: 'time'},
    {name: 'preference',iconName: 'gear', label: 'Preference', placeholder: '(optional)'},
    {name: 'specialRequest',iconName: 'gear', label: 'Special Request', placeholder: '(optional)'},
  ];

  return (
    <Form
      initialValues={{date: '',tableSize: '',hour: '',preference: '',specialRequest: '' }}
      validationSchema={TableReservationFormSchema}
      onSubmit={(values) => console.log(values)}
      fields={fields}
      submitTitle= "RESERVE"
      formName="Reservation" // This is a string
    />
      );
  };

export default TableReservationForm;
