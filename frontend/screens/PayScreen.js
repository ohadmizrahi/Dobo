import { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StatusBar, Alert } from 'react-native';
import InvoiceComponent from '@Components/ItemPayment';
import YourAccountButton from '@Components/YourAccountButton';
import PaymentForm from '@Components/PaymentForm';
import ExitSign from '@Components/ExitSign';
import LineAcross from '@Components/LineAcross';
import HeaderImage from '@Components/HeaderImage';
import { getData, removeMulti } from '@Utils/storage/asyncStorage';
import { sendGetRequest, sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';


export default function PayScreen({ navigation }) {
  const [check, setCheck] = useState([]);
  const [balance, setBalance] = useState(0);
  console.log('check', check);
  console.log('balance', balance);

  function handleNoOrders(error) {
    if (error) {
      const { status, error: errorMessage } = error;
      if (status !== 404 || errorMessage !== 'No orders') {
        Alert.alert(`Error ${status}`, errorMessage);
        return;
      }
      setCheck([]);
      setBalance(0);
    }
  }

  useEffect(() => {
    const getCheck = async () => {
      const userToken = await getData('userToken');
      const clientToken = await getData('clientToken');
      const response = await sendGetRequest(
        'api/table/check/calculate',
        tokens={ userToken, clientToken }
      );
      handleResponse(
        response,
        navigation,
        async (data, error) => {
            handleNoOrders(error);
            data && setCheck(data.clientOrders);
            data && setBalance(data.clientBalance);
        },
        skipErrorHandling=true
      );
    };
    getCheck();
  }, []);


  async function handleRemoveItem(id) {
      const userToken = await getData('userToken');
      const clientToken = await getData('clientToken');
      const response = await sendPostRequest(
        'api/table/check/recalculate',
        body={ orders:[{ orderId: id }] },
        tokens={ userToken, clientToken }
      );

      handleResponse(
        response,
        navigation,
        async (data, error) => {
            setCheck(data.clientOrders);
            setBalance(data.clientBalance);
        },
      );
  };

  async function handlePayment() {
    const userToken = await getData('userToken');
    const clientToken = await getData('clientToken');
    const response = await sendPostRequest(
      'api/table/check/pay',
      body={ orders: check.map(order => ({ orderId: order.orderid })) },
      tokens={ userToken, clientToken }
    );

    handleResponse(
      response,
      navigation,
      async (data, error) => {
        if (data) {
          setCheck(data.clientOrders);
          setBalance(data.clientBalance);
          return;
        }
        handleNoOrders(error);
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
      },
      skipErrorHandling=true
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{flex : 1}}>
    <StatusBar barStyle="light-content" />
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <HeaderImage />
      <ExitSign />
      <InvoiceComponent check={check} onRemoveItem={handleRemoveItem} />
      <YourAccountButton balance={balance} handlePress={handlePayment} />
      <LineAcross text='OR' />
      <PaymentForm formName='Enter Payment Method' submitTitle="Pay" edit={true}/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
