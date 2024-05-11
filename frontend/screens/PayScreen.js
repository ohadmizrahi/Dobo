import { useState, useEffect } from 'react';
import { Text, KeyboardAvoidingView, Platform, StatusBar, ScrollView, View, StyleSheet, Alert } from 'react-native';
import { getData, removeMulti } from '@Utils/storage/asyncStorage';
import { sendGetRequest, sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import {
  Invoice,
  CustomButton,
  PaymentForm,
  ExitSign,
  LineAcross,
  HeaderImage,
  LoadingIcon
} from '@Components';

export default function PayScreen({ navigation }) {
  const [check, setCheck] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true); 

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
            setLoading(false);
        },
        skipErrorHandling=true
      );
    };
    getCheck();
  }, []);


  async function handleRemoveItem(id) {
      setLoading(true);
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
            setLoading(false);
        },
      );
  };

  async function pay() {
    setLoading(true);
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
        setLoading(false);
        Alert.alert(
          'Success',
          'You have successfully paid and left the table.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home')
            }
          ]
        );
      },
      skipErrorHandling=true
    );
  }

  async function handleDefaultPayment() {
    let hasPaymentMethod = await getData('paymentMethod');
    hasPaymentMethod = JSON.parse(hasPaymentMethod);
    if (!hasPaymentMethod && balance > 0) {
      Alert.alert(
        'No Payment Method',
        'You do not have a payment method configured. Please configure one before proceeding.'
      );
      return;
    }
      Alert.alert(
        'Confirm Checkout',
        'Are you sure you want to checkout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => pay(),
          },
        ],
        { cancelable: false }
      );
  }

  
  function handleFormPayment() {
      Alert.alert(
        'Confirm Checkout',
        'Are you sure you want to checkout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => pay(),
          },
        ],
        { cancelable: false }
      );
  }
  

  if (loading) { 
    return <LoadingIcon backgroundColor={'#3D3D3D'}/>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{flex : 1}}>
    <StatusBar barStyle="light-content" />
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <HeaderImage />
      <ExitSign />
      <View style={styles.container}>
          <ScrollView style={styles.invoiceContainer} nestedScrollEnabled={true}>
            <Invoice check={check} onRemoveItem={handleRemoveItem} />
          </ScrollView>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: balance > 0 ? 20 : 0}}>
            {balance > 0 && (<Text>
              Click here to pay with default payment method
            </Text>)}
            {balance === 0 && (<Text>
              Click here to leave the table
            </Text>)}
            <CustomButton
              title={'Your Account'}
              handlePress={handleDefaultPayment}
              buttonStyle={styles.button}
            >
              ${balance}

            </CustomButton>
          </View>
      </View>
      <LineAcross text='OR' />
      <PaymentForm formName='Use New Payment Method' submitTitle="Pay" edit={true} handlePayment={handleFormPayment}/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  invoiceContainer: {
    flex: 1,
    maxHeight: 380,
  },
  button: {
    backgroundColor: '#97DECC',
    width: 300,
    height: 50,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    textColor: 'black',
  },
});

