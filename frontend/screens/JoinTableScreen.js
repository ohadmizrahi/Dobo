import { useState, useEffect } from 'react';
import { Alert, ScrollView, StatusBar } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import { sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { storeData, getData } from '@Utils/storage/asyncStorage';
import { 
  DoboLogo,
  JoinTableForm,
  ConnectedFriends,
  LineAcross,
  TableLink,
  CustomButton,
  LoadingIcon
} from '@Components';

export default function JoinTableScreen({ navigation, route }) {
  const qrData = route.params ? JSON.parse(route.params.qrData) : null
  const [qrLoading, setQrLoading] = useState(route.params ? true : false);
  const [clientId, setClientId] = useState('');
  const [tableToJoin, setTableToJoin] = useState({
    businessId: qrData && qrData.business,
    tableId: qrData && qrData.table
  });
  const [loading, setLoading] = useState(false);


  async function handleGoToTable() {
    const userToken = await getData('userToken');
    const clientToken = await getData('clientToken');
    if (!clientToken || !userToken) {
      console.log('No Client Token');
      Alert.alert(
        'Please Join Table First',
        'You need to join a table before you can go to it.',
        [{
          text: 'OK',
        }],
      );
    }
    else {
    navigation.navigate('TableStatus', { userToken, clientToken });
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userToken = await getData('userToken');
      const joinTableTokens = { userToken }

      const joinTableBody = {
        businessId: tableToJoin.businessId,
        tableId: tableToJoin.tableId
      }

      const response = await sendPostRequest('api/table/join', joinTableBody, joinTableTokens);
      await handleResponse(
        response,
        navigation,
        async (data, error) => {
          console.log('data', JSON.stringify(data));
          await storeData('clientToken', data.client.token);
          await storeData('clientRefreshToken', data.client.tokenForRefresh);
          await storeData('client', { clientId: data.client.clientid });
          await storeData('virtualTable', { 
            virtualtableId: data.virtualTable.virtualtableid,
            tableId: data.virtualTable.tableid,
            businessId: data.virtualTable.businessid,
            virtualTableName: data.virtualTable.name,
            menu: data.menu
          });
        
          setClientId(data.client.clientid);
        }
      );
      setLoading(false);
      setQrLoading(false);
    };
    async function blockReJoin() {
      const clientToken = await getData('clientToken')
      if (clientToken && clientToken.length > 0) {
        const client = JSON.parse(await getData('client'))
        setClientId(client.clientId);
      }
    }
    blockReJoin()
    if (tableToJoin.businessId && tableToJoin.tableId) {
      console.log('fetching data');
      fetchData();
    }
  }, [tableToJoin]);



if (qrLoading) {
  return <LoadingIcon backgroundColor="#3D3D3D"/>;
}

  return (
    <ScrollView style={globalStyles.screenColor}  contentContainerStyle={{ paddingBottom: 50 }}>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      {loading ?
      <LoadingIcon/> : 
      <JoinTableForm 
      qrData={qrData}
      joined={clientId !== ''}
      handleSubmit={
        (businessId, tableId) => setTableToJoin({
          businessId: businessId,
          tableId: tableId
          })
        }
      />}
      <ConnectedFriends navigation={navigation} />
      <LineAcross text='OR' />
      <TableLink />
      <CustomButton handlePress={handleGoToTable} title='Go to Table' buttonStyle={{marginTop: 20}}/>
    </ScrollView>
  );
}