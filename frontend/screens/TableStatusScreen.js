import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import CustomButton from '@Components/CustomButton';
import LatestOrder from '@Components/LastOrders';
import LogoImage from '@Components/DoboLogo';
import { globalStyles } from '@Root/globalStyles';
import FriendsInTable from '@Components/FriendInTable';
import { getData } from '@Utils/storage/asyncStorage';
import { sendGetRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';

export default function TableStatusScreen({ navigation }) {
  const [table, setTable] = useState({ tableName: '', latestOrders: [], friends: [] })
    
  useEffect(() => {
    const fetchData = async () => {
        const userToken = await getData('userToken');
        const clientToken = await getData('clientToken'); 
        const response = await sendGetRequest('api/table', { userToken, clientToken });

        await handleResponse(
            response,
            navigation,
            async (data, error) => {
                const newTable = {
                    ...table,
                    tableName: data.virtualTable.name,
                    latestOrders: data.orders,
                    friends: data.clients
                };
                setTable(newTable);
            }
        );
    };

    fetchData()
    
    }, []);
  function handlePayNow() {
    navigation.navigate('Pay');
  }

  function handleOrderNow() {
    navigation.navigate('Order');
  }
  return (
    <ScrollView style={globalStyles.screenColor}>
      <StatusBar barStyle="light-content" />
      <LogoImage />
      <CustomButton handlePress={handleOrderNow} title='Order Now' />
      <LatestOrder orders={table.latestOrders} />
      <FriendsInTable friends={table.friends} />
      <CustomButton handlePress={handlePayNow} title={'Pay Now'} backgroundColor={'red'}/>
    </ScrollView>
  );
}
