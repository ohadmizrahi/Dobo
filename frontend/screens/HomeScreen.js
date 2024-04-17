import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import { Places } from '@Components/Places';
import { globalStyles } from '@Root/globalStyles';
import SearchBar from '@Components/SearchBar';
// add bell

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={[globalStyles.screenColor,globalStyles.container]}>
      <SearchBar/>
      <Places />
    </ScrollView>
  );
}
