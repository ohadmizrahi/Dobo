import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform,StatusBar } from 'react-native';
import InvoiceComponent from '@Components/ItemPayment';
import YourAccountButton from '@Components/YourAccountButton';
import PaymentForm from '@Components/PaymentForm';
import LogoImage from '@Components/DoboLogo';
import ExitSign from '@Components/ExitSign';
import { globalStyles } from '@Root/globalStyles';
import LineAcross from '@Components/LineAcross';
// Define the invoice data
const invoicesData = [
    {
      id: '1',
      item: 'Classic Burger',
      price: 10,
      payers: ['John', 'Alice']
    },
    {
      id: '2',
      item: 'Pizza Margarita',
      price: 12,
      payers: ['Bob', 'Alice', 'Emily']
    },
];

export default function PayScreen({ navigation }) {
  const [invoices, setInvoices] = useState(invoicesData);

  const handleRemoveItem = (id) => {
    setInvoices(prevInvoices => prevInvoices.filter(item => item.id !== id));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <LogoImage />
      <InvoiceComponent invoiceList={invoices} onRemoveItem={handleRemoveItem} />
      <YourAccountButton invoices={invoices} />
      <LineAcross text='Payment Method' />
      <PaymentForm />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
