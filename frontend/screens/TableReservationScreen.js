import React from 'react';
import { View, Text } from 'react-native';
import TableReservationForm from '../components/Reservation';
import {globalstyles} from '../globalStyles';


export default function TableReservationScreen({ navigation}) {
  return (
    <View>
      <Text>TableReservation</Text>
      <TableReservationForm />
    </View>
  );
}