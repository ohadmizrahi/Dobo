import React from 'react';
import { View , Text } from 'react-native';
import Menu from '../components/Menu';
import MoveScreenButton from '../components/MoveScreenBtn';

export default function OrderScreen({ navigation }) {
  return (
    <View>
      <Text>Order</Text>
      <MoveScreenButton navigation={navigation} screen='OrderCart' title={'View Order'} />
      <Menu navigation={navigation} isOrderScreen={true} />
    </View>
  );
}


