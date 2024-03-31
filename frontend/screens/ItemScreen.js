import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import {globalStyles} from '../globalStyles';
import ItemChanges from '../components/ItemChanges';
import ItemView from '../components/Itemview';

export default function ItamScreen({route, navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor} >
      <ItemChanges route={route}/>
      <ItemView navigation={navigation} route={route} />
    </ScrollView>
  );
}