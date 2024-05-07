import { ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { globalStyles } from '@Root/globalStyles';
import { sendGetRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import {
  CustomButton,
  DoboLogo,
  LastOrders,
  FriendsInTable,
  LoadingIcon,
  TableHeader
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
    return <LoadingIcon />;
  }

  return (
    <ScrollView style={globalStyles.screenColor} contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      <View style={styles.container}>
        <View style={styles.row}>
          <TableHeader showPencilButton={true}/>
        </View>
        <View style={styles.row}>
          <CustomButton handlePress={handleOrderNow} title='Order Now' />
        </View>
        <View style={styles.row}>
          <LastOrders orders={table.latestOrders} />
        </View>
        <View style={styles.row}>
          <FriendsInTable friends={table.friends} />
        </View>
        <View style={styles.row}>
          <CustomButton handlePress={handlePayNow} title={'Pay Now'} buttonStyle={{backgroundColor: 'red'}}/>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
