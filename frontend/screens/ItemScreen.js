import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import {globalStyles} from '../globalStyles';
import Bell from '../components/Bell';
import ItemChanges from '../components/ItemChanges';

export default function ItamScreen({navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor} >
      <ItemChanges />
    </ScrollView>
  );
}