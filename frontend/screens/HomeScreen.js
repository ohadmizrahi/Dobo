import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import { Places } from '../components/Places';
import { globalStyles } from '../globalStyles';
import SearchBar from '../components/SearchBar';
// add bell

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={[globalStyles.screenColor,globalStyles.container]}>
      <SearchBar/>
      <Places />
    </ScrollView>
  );
}
