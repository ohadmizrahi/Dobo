import React, { useState } from 'react';
import { TableReservationFormSchema } from '@Schemas/reservationSchema';
import Form from '@Components/Form';
import { sendPostRequest } from '@Utils/request/send.js';
import { handleResponse } from '@Utils/response/handler';
import { getData } from '@Utils/storage/asyncStorage';
import { useNavigation } from '@react-navigation/native';
import { Alert, Text } from 'react-native';
import LoadingIcon from '@Components/LoadingIcon';

const TableReservationForm = (data) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const fields = [
    {name: 'date', label: 'Date', iconName: 'calendar', placeholder: 'dd/mm/yyyy', keyboardType: 'numeric'},
    {name: 'tableSize', label: 'TableSize', iconName: 'user', placeholder: 'Number Of Pepole'},
    {name: 'hour', label: 'Hour', iconName: 'clock-o', placeholder: 'Reservation Hour', Keyboardtype: 'time'},
    {name: 'preference',iconName: 'gear', label: 'Preference', placeholder: '(optional)'},
    {name: 'specialRequest',iconName: 'gear', label: 'Special Request', placeholder: '(optional)'},
  ];

  const onSubmit = async (values) => {
    setLoading(true);

    const reservationInfo = {
      businessId: data.data,
      date: values.date,
      time: values.hour,
      numOfPeople: values.tableSize,
      preference: values.preference,
      specialRequests: values.specialRequest,
    };
    
    const [day, month, year] = values.date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    reservationInfo.date = formattedDate;

    try {
      const userToken = await getData('userToken');
      const response = await sendPostRequest('api/business/reservation', reservationInfo, { userToken });
      console.log('Response:', response);
      await handleResponse(
        response,
        navigation,
        async (data, error) => {
          if (response.success) {
            const reservationDetails = `Date: ${reservationInfo.date}\nTime: ${reservationInfo.time}\nNumber of people: ${reservationInfo.people}`;
            Alert.alert('Success', `Your reservation was successful!\n\n${reservationDetails}`);
          }
          navigation.navigate('Home');
        }
      );
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || 'There was an error. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingIcon />} 
      <Form
        initialValues={{date: '',tableSize: '',hour: '',preference: '',specialRequests: '' }}
        validationSchema={TableReservationFormSchema}
        onSubmit={onSubmit}
        fields={fields}
        submitTitle= "RESERVE"
        formName="Reservation"
      />
    </>
  );
};

export default TableReservationForm;