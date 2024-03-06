import React from 'react';
import { View, Text, Button } from 'react-native';
// import Header from '../components/Header'; 

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Item" onPress={() => navigation.navigate('Item')} />
    </View>
  );
}
