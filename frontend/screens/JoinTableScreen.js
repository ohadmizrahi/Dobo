import { useState, useEffect } from 'react';
import { Alert, ScrollView, StatusBar } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import DoboLogo from '@Components/DoboLogo';
import JoinTableForm from '@Components/JoinTableForm';
import ConnectedFriends from '@Components/ConnectedFriends';
import LineAcross from '@Components/LineAcross';
import TableLink from '@Components/TableLink';
import CustomButton from '@Components/CustomButton';
import { sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import { storeData, getData, removeMulti } from '@Utils/storage/asyncStorage';

export default function JoinTableScreen({ navigation, route }) {
  const qrData = route.params ? JSON.parse(route.params.qrData) : null

  const [clientId, setClientId] = useState('');
  const [tableToJoin, setTableToJoin] = useState({
    businessId: qrData && qrData.business,
    tableId: qrData && qrData.table
  });

  async function handleGoToTable() {
    console.log('going to table');
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

      const userToken = await getData('userToken');
      console.log('userToken', userToken);
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
    };
    async function blockReJoin() {
      const clientToken = await getData('clientToken')
      if (clientToken && clientToken.length > 0) {
        console.log('clientToken', clientToken);
        const client = JSON.parse(await getData('client'))
        console.log('client', client);
        setClientId(client.clientId);
      }
    }
    blockReJoin()
    if (tableToJoin.businessId && tableToJoin.tableId) {
      console.log('fetching data');
      fetchData();
    }
  }, [tableToJoin]);

  return (
    <ScrollView style={globalStyles.screenColor}>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      <JoinTableForm 
      qrData={qrData}
      joined={clientId !== ''}
cd      handleSubmit={
        (businessId, tableId) => setTableToJoin({
          businessId: businessId,
          tableId: tableId
          })
        }
      />
      <ConnectedFriends navigation={navigation} />
      <LineAcross text='OR' />
      <TableLink />
      <CustomButton handlePress={handleGoToTable} title='Go to Table' />
    </ScrollView>
  );
}