import { useState, useEffect } from 'react';
import { ScrollView, StatusBar } from 'react-native';
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
  console.log('qrData', qrData);

  const [clientId, setClientId] = useState('');
  const [tableToJoin, setTableToJoin] = useState({
    businessId: qrData && qrData.business,
    tableId: qrData && qrData.table
  });

  console.log('tableToJoin', JSON.stringify(tableToJoin));
  console.log('clientId', clientId);

  function handleGoToTable() {
    console.log('going to table');
    navigation.navigate('TableStatus');
  }

  async function handleCleanup() {
    console.log('cleaning client data');
    const keysToRemove = [
        'clientToken',
        'clientRefreshToken',
        'client',
        'virtualTable',
        'FriendsData',
        'cart'
    ];
    await removeMulti(keysToRemove);
    navigation.navigate('Home');
  }

  useEffect(() => {
    const fetchData = async () => {

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
            menu: data.menu.items
          });
        
          setClientId(data.client.clientid);
        }
      );
    };
    async function blockReJoin() {
      const clientToken = await getData('clientToken')
      if (clientToken.length > 0) {
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
      handleSubmit={
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
      <CustomButton handlePress={handleCleanup} title='TEMP CLEANUP' />
    </ScrollView>
  );
}