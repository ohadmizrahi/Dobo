import React from 'react';
import { View, StatusBar } from 'react-native';
import Businessinformation from '@Components/BussinesInfo';
import { globalStyles } from '@Root/globalStyles';
import ExitSign from '@Components/ExitSign';
import BussinesHeader from '@Components/BussinesHeader';

export default function BusinessInfoScreen({ navigation }) {
return (
  <View style={globalStyles.screenColor}>
    <StatusBar barStyle="light-content" />
    <ExitSign/>
    <BussinesHeader/> 
    <Businessinformation navigation={navigation} />
  </View>
  );
}