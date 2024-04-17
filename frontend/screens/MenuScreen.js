import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import Menu from '@Components/Menu';
import BusinessCard from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';

export default function MenuScreen({ navigation }) {
  return (
    <View>
      <ExitSign/>
      <Menu isOrderScreen={false}/>
    </View>
  );
}