import { ScrollView, View, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { Places } from '@Components/Places';
import { globalStyles } from '@Root/globalStyles';
import SearchBar from '@Components/SearchBar';
import Bell from '@Components/Bell';
import { FilterPlaces } from '@Components/FilterPlaces';
import { sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import LoadingIcon from '@Components/LoadingIcon';
// TBD : how to divide the places into different sections

export default function HomeScreen({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); 

  const homeFetchConfiguration = {
    groups: ['recommend', 'new', 'name'],
    order: 'DESC',
    limit: 5,
    offset: 0,
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await sendPostRequest('api/home', homeFetchConfiguration);
      await handleResponse(
        response,
        navigation,
        async (data, error) => {
          setLoading(false);
          if (error) {
            console.log('Error:', error);
            return;
          }

          const { recommend: recommendGroup, new: newPlaces, name: nameGroup, businessId: idGroup } = data.groups;
          idGroup
          ? setPlaces({'unorderd': idGroup})
          : setPlaces({'recommend': recommendGroup, 'new': newPlaces, 'name': nameGroup});
        }
      );
    };
    fetchData();
  }, []);

  if (loading) { 
    return <LoadingIcon />;
  }
  
  return (
    <View style={globalStyles.screenColor}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <SearchBar/>
        <FilterPlaces/>
        <Places title="New places" data={places.new} />
        <Places title="Near you" data={places.name} />
        <Places title="Recomended for you" data={places.recommend} />
        <Places title="Italian" data={places.name} />
        <Places title="Breakfast" data={places.name} />
      </ScrollView>
      <Bell navigation={navigation} />
    </View>
  );
}
