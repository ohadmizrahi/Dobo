import React from 'react';
import { View, Text, Button } from 'react-native';
import PaymentForm from '../components/PaymentForm';
import { View,ScrollView, Text, Button } from 'react-native';

export default function PayScreen({ navigation }) {
  return (
    <ScrollView>
      <Text>Pay</Text>
      <PaymentForm />
    </View>
    </ScrollView>
  );
}