import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import Menu from '@Components/Menu';
import BusinessHeader from '@Components/BussinesHeader';

export default function MenuScreen({ navigation }) {
  return (
    <View>
      <Menu isOrderScreen={false}/>
    </View>
  );
}