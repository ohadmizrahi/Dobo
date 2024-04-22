import React from 'react';
import { View,ScrollView, StatusBar, StyleSheet } from 'react-native';
import Menu from '@Components/Menu';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';
import HeaderImage from '@Components/HeaderImage';
export default function MenuScreen({ navigation, route }) {
  const { menu = [], imageurl = '' } = route.params || {};

  return (
    <View style = {styles.container}>
      <StatusBar barStyle="light-content" />
      <ExitSign/>
      <HeaderImage data={imageurl} />
      <Menu isOrderScreen={false} data={{ menu }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },});