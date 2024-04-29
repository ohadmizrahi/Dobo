import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { storeData, getData } from '@Utils/storage/asyncStorage'; // Import getData here


export default function ItemAddToCart({ route, navigation }) {
  const { item } = route.params;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const data = await getData('cart');
      if (data) {
        setCart(JSON.parse(data));
      }
    };
    fetchCartData();
  }, []);

  const handleAddToCart = async (person) => {
    const itemClients = [];
    clientsData = await getData('FriendsData')
    TableClients = JSON.parse(clientsData)
    if (person==="Me") {
      const clientData = await getData('client');
      const parsedClientData = JSON.parse(clientData);
      itemClients.push(parsedClientData.clientId)
    }else if (person==="Table"){
      TableClients.forEach(client => {
        itemClients.push(client.clientid)
      })
    }
    item.clients = itemClients
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    await storeData('cart', updatedCart);
    navigation.navigate('Order');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addToCartButton} onPress={()=> {handleAddToCart('Me')}}>
        <Text style={styles.addToCartButtonText}>Add to Me</Text>
      </TouchableOpacity>
      <View style={styles.price}>
        <Text>{item.price}$</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={()=> {handleAddToCart('Table')}}>
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
    marginTop: -20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#97DECC',
    padding: 10,
    height: 60,
    borderRadius: 50,
    margin: 10,
    marginBottom: 20,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
  },
  addToCartButtonText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  price: {
    backgroundColor: 'lightgrey',
    borderRadius: 50,
    width: 70,
    height: 70,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
