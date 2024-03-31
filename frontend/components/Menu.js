// Menu of the items that the bussines has
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchAPI } from '../util/fetch';
import {API_URL} from '@env';

const menu = [
        {
            id: '1',
            name: 'Classic Burger',
            price: '$10',
            image: 'https://img.freepik.com/free-psd/fresh-beef-burger-isolated-transparent-background_191095-9018.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710806400&semt=ais',
        },
        {
            id: '2',
            name: 'Pizza Margarita',
            price: '$12',
            image: 'https://img.freepik.com/free-photo/thinly-sliced-pepperoni-is-popular-pizza-topping-american-style-pizzerias-isolated-white-background-still-life_639032-229.jpg?w=740&t=st=1710873249~exp=1710873849~hmac=81f4fc1f496f5e475cc89d3a60799b33c00d60816fb2f1aa3be7768b0d7e6bf1',
        },
        {
            id: '3',
            name: 'Spaghetti Bolognese',
            price: '$15',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fpizza-png.html&psig=AOvVaw0Zn0nimVQOBsTFvUVgFFkO&ust=1710959540791000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMierJj7gIUDFQAAAAAdAAAAABAJ',
        },
        {
            id: '4',
            name: 'Chicken Caesar Salad',
            price: '$12',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fpizza-png.html&psig=AOvVaw0Zn0nimVQOBsTFvUVgFFkO&ust=1710959540791000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMierJj7gIUDFQAAAAAdAAAAABAJ',
        },
        {
            id: '5',
            name: 'Sushi Platter',
            price: '$18',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fpizza-png.html&psig=AOvVaw0Zn0nimVQOBsTFvUVgFFkO&ust=1710959540791000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMierJj7gIUDFQAAAAAdAAAAABAJ',
        },
        {
            id: '6',
            name: 'Chocolate Brownie Sundae',
            price: '$8',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fpizza-png.html&psig=AOvVaw0Zn0nimVQOBsTFvUVgFFkO&ust=1710959540791000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMierJj7gIUDFQAAAAAdAAAAABAJ',
        },
     
    ];

export default function Menu ({navigation, isOrderScreen }){
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(menu);
  }, []);

  const renderProducts = ({ item }) => {
    const bb = item.image;
    return (
      <View>
        {isOrderScreen ? (
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Item", { itemID: item.id, itemName: item.name, itemPrice: item.price, itemImg: item.bb })}>
            <View style={styles.itemDetailsContainer}>
              <Image source={{ uri: bb }} style={styles.imageContainer} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price:{item.price}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={[styles.itemDetailsContainer,styles.menuItem]}>
            <Image source={{ uri: bb }} style={styles.imageContainer} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Price:{item.price}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProducts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row', // Change to row for horizontal layout
        margin: 3,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    imageContainer: {
        width: 100, // Set a fixed width for the image container
        height: 100, // Set a fixed height for the image container
        marginRight: 10, // Add margin for spacing
        borderRadius: 8, // Maintain rounded corners
        overflow: 'hidden', // Clip image content within container
    },
    itemDetailsContainer: {
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align text vertically
        flex: 1, // Fill remaining space in the row
        padding: 10,
    },
    itemName: {
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, // Allow text to wrap if name is long
        paddingLeft: 10,
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
    },
});
