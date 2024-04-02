import React from 'react';
import { View ,ScrollView, Text, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import GoToCart from '../components/GoToCartBTN';

export default function OrderScreen({ navigation,route }) {
  return (
    <View>
      <Text>Order</Text>
      <GoToCart navigation={navigation} route={route} />
      <Menu navigation={navigation} isOrderScreen={true} />
    </View>
  );
}
