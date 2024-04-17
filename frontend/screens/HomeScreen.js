import React from 'react';
import { ScrollView } from 'react-native';
import { Places } from '@Components/Places';
import { globalStyles } from '@Root/globalStyles';
import SearchBar from '@Components/SearchBar';
import Bell from '@Components/Bell';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={[globalStyles.screenColor,globalStyles.container]}>
      <SearchBar/>
      <Places />
      <Bell navigation={navigation} />
    </ScrollView>
  );
}
