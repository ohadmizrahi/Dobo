import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import LogoutButton from '../components/LogOut';
import { globalStyles } from '../globalStyles';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <Text>Profile</Text>
      <LogoutButton navigation={navigation} />
    </ScrollView>
  );
}