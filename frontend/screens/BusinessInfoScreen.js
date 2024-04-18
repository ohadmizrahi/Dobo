import React from 'react';
import { View } from 'react-native';
import Businessinformation from '@Components/BussinesInfo';
import { globalStyles } from '@Root/globalStyles';
import BusinessCard from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';


export default function BusinessInfoScreen({ navigation }) {



return (
  <View style={globalStyles.screenColor}>
    <ExitSign/>
    <BusinessCard/> 
    <Businessinformation navigation={navigation} />
  </View>
  );
}