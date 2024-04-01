import React from 'react';
import { View,ScrollView, Text } from 'react-native';
import TableReservationForm from '../components/Reservation';
import BusinessCard from '../components/BussinesHeader';


export default function TableReservationScreen({ navigation},{BusinessID}) {
  return (
    <ScrollView>
      <Text>TableReservation</Text>
      <BusinessCard />
      <TableReservationForm />
    </ScrollView>
  );
}