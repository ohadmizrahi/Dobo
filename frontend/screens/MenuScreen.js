import React from 'react';
import { View,ScrollView, StatusBar, StyleSheet } from 'react-native';
import Menu from '@Components/Menu';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';

export default function MenuScreen({ navigation }) {
  return (
    <View style = {styles.container}>
      <StatusBar barStyle="light-content" />
      <ExitSign/>
      <BusinessHeader/>
      <ScrollView style={styles.container}>
        <Menu isOrderScreen={false}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },});