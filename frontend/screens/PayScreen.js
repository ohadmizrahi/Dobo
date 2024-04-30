import { useState, useEffect } from 'react';
import { Text, KeyboardAvoidingView, Platform, StatusBar, ScrollView, View, StyleSheet, Alert } from 'react-native';
import Invoice from '@Components/ItemPayment';
import CustomButton from '@Components/CustomButton';
import PaymentForm from '@Components/PaymentForm';
import ExitSign from '@Components/ExitSign';
import LineAcross from '@Components/LineAcross';
import HeaderImage from '@Components/HeaderImage';
import { getData, removeMulti } from '@Utils/storage/asyncStorage';
import { sendGetRequest, sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';
import LoadingIcon from '@Components/LoadingIcon';

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
        navigation.navigate('Home');
      },
      skipErrorHandling=true
    );
  }

  function handlePayment() {
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
    return <LoadingIcon />;
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
            <CustomButton
              title={'Your Account'}
              handlePress={handlePayment}
              buttonStyle={payScreenStyles.button}
            >
              ${balance}
            </CustomButton>
          </View>
      </View>
      <LineAcross text='OR' />
      <PaymentForm formName='Enter Payment Method' submitTitle="Pay" edit={true}/>
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
});

const payScreenStyles = StyleSheet.create({
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
