import React from 'react';
import { View,ScrollView, Text } from 'react-native';
import TableReservationForm from '@Components/Reservation';
import BusinessHeader from '@Components/BussinesHeader';


export default function TableReservationScreen({ navigation},{BusinessID}) {
  return (
    <ScrollView>
      <Text>TableReservation</Text>
      <BusinessHeader />
      <TableReservationForm />
    </ScrollView>
  );
}