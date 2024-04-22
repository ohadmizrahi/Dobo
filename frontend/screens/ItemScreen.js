import React from 'react';
import { View,ScrollView, StatusBar } from 'react-native';
import {globalStyles} from '@Root/globalStyles';
import ItemChanges from '@Components/ItemChanges';
import ItemAddToCart from '@Components/ItemAddToCart';
import ExitSign from '@Components/ExitSign';

export default function ItamScreen({route, navigation}) {   
  return (
    <ScrollView style={{flex : 1}}>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <ItemChanges route={route}/>
      <ItemAddToCart navigation={navigation} route={route} />
    </ScrollView>
  );
}