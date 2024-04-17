import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import Cart from '@Components/Cart';
import ExitSign from '@Components/ExitSign';

export default function OrderCartScreen({ navigation }) {
  return (
    <ScrollView>
      <ExitSign/>
      <Cart navigation={navigation} />
    </ScrollView>
  );
}
