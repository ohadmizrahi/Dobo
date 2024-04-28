import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, ScrollView, StyleSheet } from 'react-native';
import InvoiceComponent from '@Components/ItemPayment';
import CustomButton from '@Components/CustomButton';
import PaymentForm from '@Components/PaymentForm';
import ExitSign from '@Components/ExitSign';
import LineAcross from '@Components/LineAcross';
import HeaderImage from '@Components/HeaderImage';

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
const Total = 50;

export default function PayScreen({ navigation }) {
  const [invoices, setInvoices] = useState(invoicesData);

  const handleRemoveItem = (id) => {
    setInvoices(prevInvoices => prevInvoices.filter(item => item.id !== id));
  };

  const handleGoToTable = () => {
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <HeaderImage />
        <ExitSign />
        <InvoiceComponent invoiceList={invoices} onRemoveItem={handleRemoveItem} />
        <CustomButton
          title={'Your Account'}
          handlePress={handleGoToTable}
          buttonStyle={payScreenStyles.button}
        >
          Total: ${Total}
        </CustomButton>
        <LineAcross text='Payment Method' />
        <PaymentForm submitTitle="Pay" edit={true} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const payScreenStyles = StyleSheet.create({
  button: {
    backgroundColor: '#97DECC',
    width: 300,
    height: 50,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#000',
  },
});
