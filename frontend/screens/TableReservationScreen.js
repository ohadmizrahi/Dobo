import React from 'react';
import { View,ScrollView, Text } from 'react-native';
import TableReservationForm from '../components/Reservation';
import {globalstyles} from '../globalStyles';


export default function TableReservationScreen({ navigation},{BusinessID}) {
  return (
    <ScrollView>
      <Text>TableReservation</Text>
      <TableReservationForm />
    </ScrollView>
  );
}