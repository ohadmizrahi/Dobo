import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, ScrollView, StyleSheet, View } from 'react-native';
import Invoice from '@Components/ItemPayment';
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
  {
    id: '3',
    item: 'Beer',
    price: 15,
    payers: ['John']
  },
  {
    id: '4',
    item: 'Pasta',
    price: 20,
    payers: ['Alice', 'Emily']
  },
  {
    id: '5',
    item: 'Cake',
    price: 10,
    payers: ['John', 'Alice']
  },
  {
    id: '6',
    item: 'Sushi',
    price: 30,
    payers: ['Emily']
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
        <View style={styles.container}>
          <ScrollView style={styles.invoiceContainer} nestedScrollEnabled={true}>
            <Invoice invoiceList={invoices} onRemoveItem={handleRemoveItem} />
          </ScrollView>
          <CustomButton
            title={'Your Account'}
            handlePress={handleGoToTable}
            buttonStyle={payScreenStyles.button}
          >
            Total: ${Total}
          </CustomButton>
        </View>
        <LineAcross text='Payment Method' />
        <PaymentForm submitTitle="Pay" edit={true} />
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  invoiceContainer: {
    flex: 1,
    maxHeight: 380,
  },
});

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
    marginTop: 30,
  },
});
