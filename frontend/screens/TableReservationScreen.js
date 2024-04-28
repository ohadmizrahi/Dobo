import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';
import TableReservationForm from '@Components/Reservation';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';
import HeaderImage from '@Components/HeaderImage';
import CustomButton from '@Components/CustomButton';
import FormHeadLine from '@Components/FormHeadLine';
import MultilineInput from '@Components/MultilineInput';
import { sendPostRequest } from '@Utils/request/send.js';
import { handleResponse } from '@Utils/response/handler';
import { getData } from '@Utils/storage/asyncStorage';



export default function TableReservationScreen({ navigation, route }) {
  const { businessId = '', imageurl = '', name = '' } = route.params || {};
  const [formData, setFormData] = useState({}); // State to store form data
  const [specialRequest, setSpecialRequest] = useState('');


  const handleFormChange = (values) => {
    setFormData(values); // Update the form data in the state
  };

  const handleSubmit = async () => {
    console.log('Submitting reservation:', formData);
    console.log('Special request check:', specialRequest);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <ExitSign />
        <HeaderImage data={imageurl} />
        <FormHeadLine data={name} />
        <BusinessHeader />
        <TableReservationForm
          data={businessId}
          onChange={handleFormChange} // Pass the handleFormChange callback to the TableReservationForm
        />
        <MultilineInput icon='gear' label="Special Request (Optional)"
          onChange={setSpecialRequest}
          value={specialRequest}
          placeholder="Enter special request"
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
