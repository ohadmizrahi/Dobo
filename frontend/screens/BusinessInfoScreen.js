import React from 'react';
import { View, StatusBar } from 'react-native';
import Businessinformation from '@Components/BussinesInfo';
import { globalStyles } from '@Root/globalStyles';
import ExitSign from '@Components/ExitSign';
import BussinesHeader from '@Components/BussinesHeader';
import { FilterPlaces } from '@Components/FilterPlaces';

export default function BusinessInfoScreen({ navigation }) {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <BussinesHeader />
      <FilterPlaces/>
      <Businessinformation navigation={navigation} />
    </View>
  );
}
