import React from 'react';
import { View, Text, Button } from 'react-native';
import LogoutButton from '../components/LogOut';
import { globalStyles } from '../globalStyles';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={globalStyles.screenColor}>
      <Text>Profile</Text>
      <LogoutButton navigation={navigation} />
    </View>
  );
}