import React from 'react';
import { ScrollView } from 'react-native';
import InvoiceComponent from '../components/ItemPayment';
import YourAccountButton from '../components/YourAccountButton';
import PaymentForm from '../components/PaymentForm';

export default function PayScreen({ navigation }) {
  return (
    <ScrollView>
      <InvoiceComponent />
      <YourAccountButton />
      <PaymentForm />
    </ScrollView>
  );
}
