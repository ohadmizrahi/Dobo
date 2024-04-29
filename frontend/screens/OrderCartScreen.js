import { useState } from 'react';
import { StatusBar, View, StyleSheet, Text, Alert } from 'react-native';
import Cart from '@Components/Cart';
import ExitSign from '@Components/ExitSign';
import HeaderImage from '@Components/HeaderImage';
import CustomButton from '@Components/CustomButton';
import { getData, removeData } from '@Utils/storage/asyncStorage';
import { sendPostRequest } from '@Utils/request/send';
import { handleResponse } from '@Utils/response/handler';


export default function OrderCartScreen({ navigation }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const sendOrder = async () => {
    const cart = await getData('cart');
    if (!cart) {
      return Alert.alert('No items in the cart');
    }
    const userToken = await getData('userToken');
    const clientToken = await getData('clientToken');

    const parsedCart = JSON.parse(cart);
    const orders = parsedCart.map(
      item => {
        return {
          itemId: item.itemid,
          itemName: item.name,
          clients: item.clients,
          price: item.price
        };
      });
    console.log('orders', orders);
    const response = await sendPostRequest(
      endpoint='api/table/order',
      body={ orders },
      tokens={ userToken, clientToken }
    );
    handleResponse(
      response,
      navigation,
      async (data) => {
        navigation.navigate('TableStatus',{ userToken, clientToken });
        await removeData('cart');
      });
  }
  return (
    <View>
      <StatusBar barStyle="light-content" />
      <ExitSign/>
      <HeaderImage/>
      <Text style={styles.title}>Order Items</Text>
      <Cart handleUpdateTotalPrice={setTotalPrice} />
      <View style={{marginTop: 10}}>
        <CustomButton
          title={`Send Order $${totalPrice}`}
          backgroundColor='#97DECC'
          textColor='black'
          handlePress={sendOrder}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'center',
}
});
