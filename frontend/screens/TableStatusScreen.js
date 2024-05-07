import { ScrollView, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { globalStyles } from '@Root/globalStyles';
import { sendGetRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import {
  CustomButton,
  DoboLogo,
  LastOrders,
  FriendsInTable,
  LoadingIcon
} from '@Components';

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
        return <LoadingIcon backgroundColor={'#3D3D3D'}/>;
    }

  return (
    <ScrollView style={globalStyles.screenColor} contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      <CustomButton handlePress={handleOrderNow} title='Order Now' />
      <LastOrders orders={table.latestOrders} />
      <FriendsInTable friends={table.friends} />
      <CustomButton handlePress={handlePayNow} title={'Pay Now'} buttonStyle={{backgroundColor: 'red'}}/>
    </ScrollView>
  );
}
