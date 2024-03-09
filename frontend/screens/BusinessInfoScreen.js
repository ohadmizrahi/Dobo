import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Businessinformation from '../components/BussinesInfo';
import {globalStyles} from '../globalStyles';



export default function BusinessInfoScreen({ navigation }) {
  // just an example of data to se on screen if it works 
  const businessData = {
    name: 'My Restaurant',
    description: 'cozy restaurant serving delicious Italian food.',
    rating: 4.5,
    image: 'https://example.com/business_image.jpg',
    openingHours: '10:00 AM - 10:00 PM', // Replace with your menu URL
  };
  return (
    <View style={globalStyles.screenColor}>
      <Text>BusinessInfo</Text>
      <Businessinformation navigation={navigation} business={businessData} />
    </View>
  );
}