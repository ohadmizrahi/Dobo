import React from 'react';
import { View,ScrollView, StatusBar } from 'react-native';
import Menu from '@Components/Menu';
import BusinessCard from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';

export default function MenuScreen({ navigation }) {
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <ExitSign/>
      <Menu isOrderScreen={false}/>
    </View>
  );
}