import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import {globalStyles} from '../globalStyles';
import Bell from '../components/Bell';
export default function ItamScreen({navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor} >
      <Bell />
    </ScrollView>
  );
}