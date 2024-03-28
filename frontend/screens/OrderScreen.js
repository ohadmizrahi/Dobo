import React from 'react';
import { View ,ScrollView, Text, StyleSheet } from 'react-native';
import { Places } from '../components/Places';
import Menu from '../components/Menu';
export default function OrderScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Order</Text>
      <Menu navigation={navigation} />
      <Places />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    
  },
});
