import React from 'react';
import { View,ScrollView, SafeAreaView, Button } from 'react-native';
import {globalStyles} from '../globalStyles';
import ItemChanges from '../components/ItemChanges';
import ItemView from '../components/Itemview';
import ExitSign from '../components/ExitSign';

export default function ItamScreen({route, navigation}) {   
  return (
    <ScrollView style={globalStyles.screenColor}>
      <ExitSign />
      <ItemChanges route={route}/>
      <ItemView navigation={navigation} route={route} />
    </ScrollView>
  );
}