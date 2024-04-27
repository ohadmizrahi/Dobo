import React from 'react';
import { View,ScrollView, StatusBar,StyleSheet,useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import {globalStyles} from '@Root/globalStyles';
import ItemChanges from '@Components/ItemChanges';
import ItemAddToCart from '@Components/ItemAddToCart';
import ExitSign from '@Components/ExitSign';

export default function ItamScreen({route, navigation}) {
  const [buttonPosition, setButtonPosition] = useState({ bottom: 20 });
  const windowWidth = useWindowDimensions().width;
  
  function handleScroll(event) {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const maxScroll = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
    
    // Calculate button position based on scroll position
    const buttonBottom =  (maxScroll - scrollPosition);

    // Update button position
    setButtonPosition({ bottom: buttonBottom});
  }
  return (
    <ScrollView style={{flex : 1}} contentContainerStyle={{ paddingBottom: 60 }} onScroll={handleScroll} scrollEventThrottle={16}>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <ItemChanges route={route}/>
      <View style={[styles.floatingButtonContainer,buttonPosition]}>
        <ItemAddToCart navigation={navigation} route={route} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    zIndex: 1, // Ensure the button appears above other elements
  },
});