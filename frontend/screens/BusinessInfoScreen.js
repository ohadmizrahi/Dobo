import React from 'react';
import { View } from 'react-native';
import Businessinformation from '@Components/BussinesInfo';
import { globalStyles } from '@Root/globalStyles';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';



export default function BusinessInfoScreen({ navigation }) {
  // just an example of data to se on screen if it works 
  const businessData = {
    description: 'cozy restaurant serving delicious Italian food.',
    rating: 4.5,
    openingHours: '10:00 AM - 10:00 PM', 
  };
  const BusinessHeaderData ={
    businessname: 'Aroma',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_960_720.jpg'
  };

return (
  <View style={globalStyles.screenColor}>
    <ExitSign/>
    <BusinessHeader BusinessHeader={BusinessHeaderData} /> 
    <Businessinformation navigation={navigation} business={businessData} />
  </View>
  );
}