import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import Menu from '../components/Menu';
import BusinessCard from '../components/BussinesHeader';

export default function MenuScreen({ navigation }) {
  return (
    <View>
      <Menu isOrderScreen={false}/>
    </View>
  );
}