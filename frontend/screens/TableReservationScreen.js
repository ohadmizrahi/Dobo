import React from 'react';
import { View, Text } from 'react-native';
import TableReservationForm from '../components/Reservation';


export default function TableReservationScreen({ navigation}) {
  return (
    <View>
      <Text>TableReservation</Text>
      <TableReservationForm />
    </View>
  );
}