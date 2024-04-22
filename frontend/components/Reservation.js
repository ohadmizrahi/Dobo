import React from 'react';
import { TableReservationFormSchema } from '@Schemas/reservationSchema';
import Form from '@Components/Form';
import { useState, useEffect } from 'react';
import { sendPostRequest } from '@Utils/request/send.js';

const TableReservationForm = () => {

  const fields = [
    {name: 'date', label: 'Date', iconName: 'calendar', placeholder: 'Reservation Date', Keyboardtype: 'date'},
    {name: 'tableSize', label: 'TableSize', iconName: 'user', placeholder: 'Number Of Pepole'},
    {name: 'hour', label: 'Hour', iconName: 'clock-o', placeholder: 'Reservation Hour', Keyboardtype: 'time'},
    {name: 'preference',iconName: 'envelope', label: 'Preference', placeholder: 'Preference (optional)'},
    {name: 'specialRequests',iconName: 'envelope', label: 'SpecialRequests (optional)', placeholder: 'Special Request (optional)'},
  ];
  const onSubmit = async (values)=>{
    const reservationInfo = {
      date:values.date,
      numOfPeople:values.tableSize,
      time:values.hour,
      preference:values.preference,
      specialRequests:values.specialRequest,
    };
    console.log('Submitted Reservation Info:', reservationInfo);
  };

  return (
    <Form
      initialValues={{date: '',tableSize: '',hour: '',preference: '',specialRequests: '' }}
      validationSchema={TableReservationFormSchema}
      onSubmit={onSubmit}
      fields={fields}
      submitTitle= "Send Reservation"
      formName="Reservation" 
    />
      );
  };

export default TableReservationForm;
