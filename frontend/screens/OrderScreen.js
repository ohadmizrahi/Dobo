import React from 'react';
import { View ,ScrollView, Text, StyleSheet } from 'react-native';
import { Places } from '../components/Places';
import Menu from '../components/Menu';
export default function OrderScreen({ navigation }) {
  return (
    <ScrollView>
      <Text>Order</Text>
      <Menu navigation={navigation} />
      <Places />
    </ScrollView>
  );
}