import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import Cart from '../components/Cart';

export default function OrderCartScreen({route, navigation }) {
  return (
    <ScrollView>
      <Text>OrderCart</Text>
      <Cart route={route} navigation={navigation} />
    </ScrollView>
  );
}