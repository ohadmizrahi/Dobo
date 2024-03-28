import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import {globalStyles} from '../globalStyles';
import NoPaymentDetails from '../components/PaymentDetails';
import PaymentForm from '../components/PaymentForm';
export default function ItamScreen({navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor} >
      <NoPaymentDetails />
    </ScrollView>
  );
}