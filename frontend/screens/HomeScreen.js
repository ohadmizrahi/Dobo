import { ScrollView, View, StatusBar,Modal,StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { globalStyles } from '@Root/globalStyles';
import { sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { Places, SearchBar, FilterPlaces, Bell, LoadingIcon } from '@Components';

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


  
  return (
    <View style={globalStyles.screenColor}>
      <StatusBar barStyle="light-content" />
      <Modal
        transparent={true}
        visible={loading}
        animationType="none"
      >
        <View style={styles.loadingOverlay}>
          <LoadingIcon />
        </View>
      </Modal>
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
const styles = StyleSheet.create({
  loadingOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});