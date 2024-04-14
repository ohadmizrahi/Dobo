import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import InvoiceComponent from '@Components/ItemPayment';
import YourAccountButton from '@Components/YourAccountButton';
import PaymentForm from '@Components/PaymentForm';
import LogoImage from '@Components/DoboLogo';

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
    <ScrollView>
      <LogoImage />
      <InvoiceComponent invoiceList={invoices} onRemoveItem={handleRemoveItem} />
      <YourAccountButton invoices={invoices} />
      <PaymentForm />
    </ScrollView>
  );
}
