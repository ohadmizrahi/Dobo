import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import {globalStyles} from '../globalStyles';
import Bell from '../components/Bell';
import ItemChanges from '../components/ItemChanges';
import ItemView from '../components/Itemview';

export default function ItamScreen({route, navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor} >
      {/* <ItemView navigation={navigation} route={route} /> */}
      <ItemChanges />
    </ScrollView>
  );
}