import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import Businessinformation from '@Components/BussinesInfo';
import { globalStyles } from '@Root/globalStyles';
import ExitSign from '@Components/ExitSign';
import HeaderImage from '@Components/HeaderImage';
import { FilterPlaces } from '@Components/FilterPlaces';
import { sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { storeData } from '@Utils/storage/asyncStorage';
import LoadingIcon from '@Components/LoadingIcon';

export default function BusinessInfoScreen({ navigation, route }) {
  const [businessInfo, setBusinessInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendPostRequest('api/business/info', { businessId: route.params.businessId });

        await handleResponse(
          response,
          navigation,
          async (data, error) => {
            setBusinessInfo(data);
            await storeData('businessInfo', data);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('busineesInfo', businessInfo);

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <HeaderImage data={businessInfo.imageurl} />
      <FilterPlaces />
      <Businessinformation
        navigation={navigation}
        activityTime={businessInfo.activityTime}
        description={businessInfo.description}
        menu={businessInfo.menu}
        rank={businessInfo.rank}
      />
    </View>
  );
}
