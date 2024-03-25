import React from 'react';
import { View, Text, Button } from 'react-native';
// import Header from '../components/Header'; 

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Item" onPress={() => navigation.navigate('Item')} />
      <Button title="Go to BusinessInfo" onPress={() => navigation.navigate('BusinessInfo')} />
      <Button title="Go to JoinTable" onPress={() => navigation.navigate('JoinTable')} />
      <Button title="Go to Order" onPress={() => navigation.navigate('Order')} />
      <Button title="Go to Pay" onPress={() => navigation.navigate('Pay')} />
      <Button title="Go to Menu" onPress={() => navigation.navigate('Menu')} />
      <Button title="Go to OrderCart" onPress={() => navigation.navigate('OrderCart')} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Go to SignIn" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Go to SignUp" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Go to TableReservation" onPress={() => navigation.navigate('TableReservation')} />
      <Button title="Go to TableStatus" onPress={() => navigation.navigate('TableStatus')} />
      <Button title="Go to QRScanner" onPress={() => navigation.navigate('QRScanner')} />
    </View>
  );
}
