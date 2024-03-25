import React from 'react';
import { View, Text, Button } from 'react-native';
import PaymentForm from '../components/PaymentForm';

export default function PayScreen({ navigation }) {
  return (
    <View>
      <Text>Pay</Text>
      <PaymentForm />
    </View>
  );
}