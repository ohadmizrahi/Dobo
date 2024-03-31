// Menu of the items that the bussines has
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import menu from '../data/menuDate';


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
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Item", { itemID: item.id})}>
            <View style={styles.itemDetailsContainer} key={item.id}>
              <Image source={{ uri: bb }} style={styles.imageContainer} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price:{item.price}$</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={[styles.itemDetailsContainer,styles.menuItem]}>
            <Image source={{ uri: bb }} style={styles.imageContainer} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Price:{item.price}$</Text>
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
