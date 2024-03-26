import React from 'react';
import { View,ScrollView, Text, StyleSheet, Image, Button } from 'react-native';
import Businessinformation from '../components/BussinesInfo';
import {globalStyles} from '../globalStyles';
import BusinessCard from '../components/BussinesHeader';



export default function BusinessInfoScreen({ navigation }) {
  // just an example of data to se on screen if it works 
  const businessData = {
    description: 'cozy restaurant serving delicious Italian food.',
    rating: 4.5,
    openingHours: '10:00 AM - 10:00 PM', 
  };
  const businessCardData ={
    businessName: 'Aroma',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_960_720.jpg'
  };

return (
  <ScrollView style={globalStyles.screenColor}>
    <BusinessCard businessCard={businessCardData} /> 
    <Businessinformation navigation={navigation} business={businessData} />
  </ScrollView>
  );
}