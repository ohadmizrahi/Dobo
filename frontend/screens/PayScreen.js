// PayScreen.js
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import InvoiceComponent from '../components/ItemPayment';
import YourAccountButton from '../components/YourAccountButton';
import PaymentForm from '../components/PaymentForm';
import LogoImage from '../components/DoboLogo';

export default function PayScreen({ navigation }) {
  const [invoices, setInvoices] = useState([
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
  ]);

  const handleRemoveItem = (id) => {
    setInvoices(prevInvoices => prevInvoices.filter(item => item.id !== id));
  };

  return (
    <ScrollView>
      <LogoImage />
      <InvoiceComponent invoiceList={invoices} onRemoveItem={handleRemoveItem} />
      <YourAccountButton invoices={invoices} />
      <PaymentForm />
    </ScrollView>
  );
}
