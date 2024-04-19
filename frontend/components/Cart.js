import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getData, removeData, storeData } from '@Utils/storage/asyncStorage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cart({navigation}) {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const data = await getData('cart');
      if (data) {
        setSelectedItems(JSON.parse(data));
      }
    };
    fetchCartData();
  }, []);

  const removeItem = async (index) => {
    const updatedCart = [...selectedItems];
    updatedCart.splice(index, 1);
    setSelectedItems(updatedCart);
    await removeData('cart');
    await storeData('cart', updatedCart);
  };

  const sendorder = async () => {
    await getData('cart');
    navigation.navigate('TableStatus');
    console.log(selectedItems); // צריך לשלוח את הדאטה של ההזמנה לדאטה בייס וגם להציג את מה הוזמן במסך של השולחן
    await removeData('cart');
  }

  if (selectedItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No items in the cart.</Text>
      </View>
    );
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedItems.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      {selectedItems.map((item, index) => (
        <View style={styles.itemContainer} key={index}>
          <TouchableOpacity onPress={() => removeItem(index)}>
            <Icon name="minus-circle" size={24} color="red" />
          </TouchableOpacity>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Price: {item.price}$</Text>
          <Text style={styles.itemName}>User/Table</Text>
        </View>
      ))}
      <TouchableOpacity onPress={()=> sendorder()}>
      <Text style={styles.totalPrice} >Send Order ${calculateTotalPrice()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  itemPrice: {
    fontSize: 14,
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
