import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import TableReservationForm from '@Components/Reservation';
import BusinessCard from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';
import { globalStyles } from '@Root/globalStyles';


export default function TableReservationScreen({ navigation},{BusinessID}) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
    <ScrollView>
      <ExitSign/>
      {/* <BusinessCard /> */}
      <TableReservationForm />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}