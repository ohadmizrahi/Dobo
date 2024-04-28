import { ScrollView, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import CustomButton from '@Components/CustomButton';
import LatestOrder from '@Components/LastOrders';
import LoadingIcon from '@Components/LoadingIcon';
import LogoImage from '@Components/DoboLogo';
import { globalStyles } from '@Root/globalStyles';
import FriendsInTable from '@Components/FriendInTable';
import { sendGetRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';

export default function TableStatusScreen({ navigation, route }) {
  const [table, setTable] = useState({ tableName: '', latestOrders: [], friends: [] })
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchData = async () => {
        const { userToken, clientToken } = route.params;
        const response = await sendGetRequest('api/table', { userToken, clientToken });

        await handleResponse(
            response,
            navigation,
            async (data, error) => {
                setLoading(false);
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

  if (loading) { 
    return <LoadingIcon />;
  }

  return (
    <ScrollView style={globalStyles.screenColor} contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar barStyle="light-content" />
      <LogoImage />
      <CustomButton handlePress={handleOrderNow} title='Order Now' />
      <LatestOrder orders={table.latestOrders} />
      <FriendsInTable friends={table.friends} />
      <CustomButton handlePress={handlePayNow} title={'Pay Now'} backgroundColor={'red'}/>
    </ScrollView>
  );
}
