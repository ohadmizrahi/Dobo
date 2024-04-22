import React from 'react';
import { View,ScrollView, Text, StatusBar } from 'react-native';
import Cart from '@Components/Cart';
import ExitSign from '@Components/ExitSign';
import HeaderImage from '@Components/HeaderImage';


export default function OrderCartScreen({ navigation }) {
  return (
    <ScrollView>
      <StatusBar barStyle="light-content" />
      {/* It can gets an imageUrl prop */}
      <HeaderImage/> 
      <ExitSign/>
      <Cart navigation={navigation} />
    </ScrollView>
  );
}
