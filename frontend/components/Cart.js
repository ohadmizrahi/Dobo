import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getData, removeData, storeData } from '@Utils/storage/asyncStorage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cart({ handleUpdateTotalPrice}) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const data = await getData('cart');
      if (data) {
        const parsedData = JSON.parse(data);
        setCartItems(parsedData);
      }
    };
    fetchCartData();
  }, []);

  useEffect(() => {
      const newTotalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
      handleUpdateTotalPrice(newTotalPrice);
  }, [cartItems]);

  const removeItem = async (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    await removeData('cart');
    await storeData('cart', updatedCart);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>No items in the cart.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {cartItems.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => removeItem(index)}>
            <Icon name="minus-circle" size={24} color="red" />
          </TouchableOpacity>
          <Text style={[styles.itemName, { flex: 1 }]}>{item.name}</Text>
          <Text style={[styles.itemPrice, { flex: 1 }]}>{item.price}$</Text>
          <Text style={[styles.itemName, { flex: 1 }]}>{item.clients.length > 1 ? 'Table' : 'Me'}</Text> 
        </View>
      ))}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    maxHeight: 500,
  },
  emptyCartText:{
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 20,
    paddingTop:10,
    width: 250,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#97DECC',
    borderRadius: 50,
    alignItems: 'center',
    textAlign:'center',
  },
});
