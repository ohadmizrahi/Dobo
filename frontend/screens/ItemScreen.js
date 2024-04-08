import React from 'react';
import { View,ScrollView, SafeAreaView, Button } from 'react-native';
import {globalStyles} from '../globalStyles';
import ItemChanges from '../components/ItemChanges';
import ItemAddToCart from '../components/ItemAddToCart';
import ExitSign from '../components/ExitSign';

export default function ItamScreen({route, navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor}>
      <ExitSign />
      <ItemChanges route={route}/>
      <ItemAddToCart navigation={navigation} route={route} />
    </ScrollView>
  );
}