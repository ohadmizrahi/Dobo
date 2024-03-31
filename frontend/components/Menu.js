// Menu of the items that the bussines has
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchAPI } from '../util/fetch';
import {API_URL} from '@env';
import menu from '../data/menuDate';


export default function Menu({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(menu);
  }, []);

  const renderProducts = ({ item }) => {
    const bb = item.image;
    return (
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Item", { item1: item.id })}>
        <View style={styles.itemDetailsContainer} key={item.id}>
          <Image source={{ uri: bb }} style={styles.imageContainer} />
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Price:{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
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
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
    },
});


// const Menu = () => {
//   console.log(MENU);
//   const [menu, setMenu] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchItems = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const apiEndpoint = `${API_URL}/api/business/info`; // Replace with your actual endpoint
//       const {data, error} = await fetchAPI(apiEndpoint, 'POST',{ 'Content-Type': 'application/json' },{businessId:1}); // Use GET method for fetching data
//       console.log({data:data.activityTime,error});
//       if (response.data) {
//         setMenu(response.data);
//       } else if (response.error) {
//         setError(response.error);
//       } else {
//         console.error('Unexpected response format from fetchAPI');
//       }
//      } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.menuItem}>
//       <Image source={{ uri: item.image }} style={styles.imageContainer} />
//       <View style={styles.itemDetailsContainer}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Text style={styles.itemPrice}>{item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   if (isLoading) {
//     return <Text>Loading items...</Text>;
//   }

//   if (error) {
//     return <Text>Error: {error.message}</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={menu}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };