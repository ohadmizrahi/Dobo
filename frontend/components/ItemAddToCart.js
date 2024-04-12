import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import menu from '../data/menuDate';
import React, { useState, useEffect } from 'react';
import { storeData, getData } from '../util/localStorage'; // Import getData here

export default function ItemAddToCart({ route, navigation }) {
  const { itemID } = route.params;
  const Item = menu.find(item => item.id === itemID);

  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const data = await getData('cart');
      if (data) {
        setCartState(JSON.parse(data));
      }
    };
    fetchCartData();
  }, []);

  const handleAddToCart = async () => { // להוסיף תנאי אם הלחיצה הייתה עליי או על השולחן ולפי זה לשלוח את ההזמנה יחד עם האנשים ששותפים לה
    const updatedCart = [...cartState, Item];
    setCartState(updatedCart);
    await storeData('cart', JSON.stringify(updatedCart));
    navigation.navigate('Order');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Me</Text>
      </TouchableOpacity>
      <View style={styles.price}>
        <Text>{Item.price}$</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Table</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  price: {
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderRadius: 30,
    width: 50,
    height: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
