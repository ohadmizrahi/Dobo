import React from 'react';
import { View,ScrollView, Text } from 'react-native';
import TableReservationForm from '@Components/Reservation';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';


export default function TableReservationScreen({ navigation},{BusinessID}) {
  return (
    <ScrollView>
      <ExitSign/>
      <BusinessCard />
      <Text>TableReservation</Text>
      <BusinessHeader />
      <TableReservationForm />
    </ScrollView>
  );
}