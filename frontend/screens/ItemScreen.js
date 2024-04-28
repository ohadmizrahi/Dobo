import React from 'react';
import { View,ScrollView, StatusBar, StyleSheet, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import ItemChanges from '@Components/ItemChanges';
import ItemAddToCart from '@Components/ItemAddToCart';
import ExitSign from '@Components/ExitSign';

export default function ItemScreen({route, navigation}) {
  const windowWidth = useWindowDimensions().width;
  
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} scrollEventThrottle={16}>
        <ItemChanges route={route}/>
      </ScrollView>
      <View style={styles.floatingButtonContainer}>
        <ItemAddToCart navigation={navigation} route={route} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    bottom: 20,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    zIndex: 1,
  },
});