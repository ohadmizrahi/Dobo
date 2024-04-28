import { useState } from 'react';
import { ScrollView, StatusBar, View, StyleSheet, Text } from 'react-native';
import Cart from '@Components/Cart';
import ExitSign from '@Components/ExitSign';
import HeaderImage from '@Components/HeaderImage';
import CustomButton from '@Components/CustomButton';


export default function OrderCartScreen({ navigation }) {
  const [totalPrice, setTotalPrice] = useState(0);

  const sendOrder = async () => {
    await getData('cart');
    navigation.navigate('TableStatus');
    console.log(selectedItems); // צריך לשלוח את הדאטה של ההזמנה לדאטה בייס וגם להציג את מה הוזמן במסך של השולחן
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
        <CustomButton title={`Send Order $${totalPrice}`} backgroundColor='#97DECC' textColor='black'/>
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
