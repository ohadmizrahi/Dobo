import { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { storeData } from '@Utils/storage/asyncStorage';
import { 
  BussinesInfo,
  ExitSign,
  HeaderImage,
  FilterPlaces,
  LoadingIcon,
  FormHeadLine
 } from '@Components';

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


  if (loading) {
    return <LoadingIcon />;
  }
  console.log(businessInfo.imageurl);

  
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <HeaderImage data={businessInfo.imageurl} />
      <FormHeadLine data={businessInfo.name} />
      <FilterPlaces />
      <BussinesInfo navigation={navigation} data={businessInfo}/>
    </View>
  );
}
