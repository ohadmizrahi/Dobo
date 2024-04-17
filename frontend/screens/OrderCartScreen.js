import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import Cart from '@Components/Cart';

export default function OrderCartScreen({ navigation }) {
  return (
    <ScrollView>
      <Text>OrderCart</Text>
      <Cart navigation={navigation} />
    </ScrollView>
  );
}
