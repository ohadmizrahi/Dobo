import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';
import TableReservationForm from '@Components/Reservation';
import BusinessHeader from '@Components/BussinesHeader';
import ExitSign from '@Components/ExitSign';
import { globalStyles } from '@Root/globalStyles';
import HeaderImage from '@Components/HeaderImage';
import CustomButton from '@Components/CustomButton';
import LoadingIcon from '@Components/LoadingIcon'; // Import the LoadingIcon component

export default function TableReservationScreen({ navigation, route}) {
  const { businessId = '', imageurl = '' ,name=''} = route.params || {};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{flex : 1}}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <ExitSign/>
        <HeaderImage data={imageurl} />
        <BusinessHeader />
        <TableReservationForm data={businessId}/>
        <CustomButton title="Back To Home" handlePress={() => navigation.navigate('Home')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
