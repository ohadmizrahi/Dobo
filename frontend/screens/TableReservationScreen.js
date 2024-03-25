import React from 'react';
import { View, Text } from 'react-native';
import TableReservationForm from '../components/Reservation';
import {globalstyles} from '../globalStyles';
import BusinessCard from '../components/BussinesHeader';


export default function TableReservationScreen({ navigation}) {
  return (
    <View>
      <Text>TableReservation</Text>
      <BusinessCard />
      <TableReservationForm />
    </View>
  );
}