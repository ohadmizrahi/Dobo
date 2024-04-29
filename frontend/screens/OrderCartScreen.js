import { useState } from 'react';
import { ScrollView, StatusBar, View, StyleSheet, Text } from 'react-native';
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
    const orders = cart.map(
      item => {
        return {
          itemId: item.id,
          itemName: item.name,
          clients: item.clients,
          price: item.price
        };
      });
      
    navigation.navigate('TableStatus');
    await removeData('cart');
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
