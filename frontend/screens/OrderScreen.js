import React from 'react';
import { View,ScrollView, Text, StyleSheet } from 'react-native';
import { Places } from '../components/Places';

export default function OrderScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text>Order</Text>
      <Places />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    
  },
});
