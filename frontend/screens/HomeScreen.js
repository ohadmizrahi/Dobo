import React from 'react';
import { ScrollView } from 'react-native';
import { Places } from '@Components/Places';
import { globalStyles } from '@Root/globalStyles';
import SearchBar from '@Components/SearchBar';
import Bell from '@Components/Bell';


// Duplicated Placed Just for view Until we get the data from the backend
// TBD : how to divide the places into different sections

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={[globalStyles.screenColor,globalStyles.container]}>
      <SearchBar/>
      <Places title="New places"/>
      <Places title="Near you"/>
      <Places title="Recomended for you"/>
      <Places title="Italian"/>
      <Places title="Breakfast"/>
      <Bell navigation={navigation} />
    </ScrollView>
  );
}
