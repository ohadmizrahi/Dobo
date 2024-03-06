import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ItamScreen({navigation}) {   
  return (
    <View>
      <Text>Item</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}