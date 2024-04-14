import React from 'react';
import { View,ScrollView, SafeAreaView, Button } from 'react-native';
import {globalStyles} from '@Root/globalStyles';
import ItemChanges from '@Components/ItemChanges';
import ItemAddToCart from '@Components/ItemAddToCart';
import ExitSign from '@Components/ExitSign';

export default function ItamScreen({route, navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor}>
      <ExitSign />
      <ItemChanges route={route}/>
      <ItemAddToCart navigation={navigation} route={route} />
    </ScrollView>
  );
}