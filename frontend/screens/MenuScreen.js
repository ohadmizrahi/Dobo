import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import PaymentForm from '../components/PaymentForm';
import Menu from '../components/Menu';
import BusinessCard from '../components/BussinesHeader';

export default function MenuScreen({ navigation }) {
  return (
    <ScrollView>
      {/* <PaymentForm /> */}
      <Menu />
    </ScrollView>
  );
}