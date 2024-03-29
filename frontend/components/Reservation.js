import React from 'react';
import { TableReservationFormSchema } from '../schemas/reservationSchema';
import Form from './Form';

const TableReservationForm = ({BusinessName}) => {
  const fields = [
    {name: 'date', label: 'Pick date', iconName: 'calendar', placeholder: 'Reservation Date', Keyboardtype: 'date'},
    {name: 'tableSize', label: 'TableSize', iconName: 'user', placeholder: 'Number Of Pepole'},
    {name: 'hour', label: 'Hour', iconName: 'clock-o', placeholder: 'Reservation Hour', Keyboardtype: 'time'},
    {name: 'preference',iconName: 'gear', label: 'Preference (optional)', placeholder: 'Preference'},
    {name: 'specialRequest',iconName: 'gear', label: 'SpecialRequest (optional)', placeholder: 'Special Request'},
  ];

  return (
    <Form
      initialValues={{date: '',tableSize: '',hour: '',preference: '',specialRequest: '' }}
      validationSchema={TableReservationFormSchema}
      onSubmit={(values) => console.log(values)}
      fields={fields}
      submitTitle= "SEND RESERVATION" // This is a string
      formName={BusinessName}
    />
      );
  };

export default TableReservationForm;
