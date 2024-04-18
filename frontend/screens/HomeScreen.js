import React from 'react';
import { ScrollView, View } from 'react-native';
import { Places } from '@Components/Places';
import { globalStyles } from '@Root/globalStyles';
import SearchBar from '@Components/SearchBar';
import Bell from '@Components/Bell';
import { FilterPlaces } from '@Components/FilterPlaces';

// Duplicated Placed Just for view Until we get the data from the backend
// TBD : how to divide the places into different sections

export default function HomeScreen({ navigation }) {
  return (
    <View style={globalStyles.screenColor}>
      <ScrollView>
        <SearchBar/>
        <FilterPlaces/>
        <Places title="New places"/>
        <Places title="Near you"/>
        <Places title="Recomended for you"/>
        <Places title="Italian"/>
        <Places title="Breakfast"/>
      </ScrollView>
      <Bell navigation={navigation} />
    </View>
  );
}
