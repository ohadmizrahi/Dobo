import React from 'react';
import { View ,ScrollView, Text, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import MoveScreenButton from '../components/MoveScreenBtn';

export default function OrderScreen({ navigation, route }) {
  return (
    <View>
      <Text>Order</Text>
      <MoveScreenButton navigation={navigation} screen='OrderCart' title={'hi'} route={route.params}/>
      <Menu navigation={navigation} isOrderScreen={true} />
    </View>
  );
}


