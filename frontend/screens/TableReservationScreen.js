import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import TableReservationForm from '@Components/Reservation';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';
import { globalStyles } from '@Root/globalStyles';


export default function TableReservationScreen({ navigation},{BusinessID}) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <ExitSign/>
      {/* <BusinessCard /> */}
      <BusinessHeader />
      <TableReservationForm />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}