import React from 'react';
import { View, KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';
import TableReservationForm from '@Components/Reservation';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';
import { globalStyles } from '@Root/globalStyles';


export default function TableReservationScreen({navigation}) {
  return (
  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
    <View>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <BusinessHeader />
      <TableReservationForm navigation={navigation} />
    </View>
  </KeyboardAvoidingView>
  );
}