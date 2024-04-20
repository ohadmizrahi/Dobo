import React from 'react';
import { View,ScrollView, Text, StatusBar } from 'react-native';
import Cart from '@Components/Cart';
import ExitSign from '@Components/ExitSign';

export default function OrderCartScreen({ navigation }) {
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      <ExitSign/>
      <Cart navigation={navigation} />
    </ScrollView>
  );
}
