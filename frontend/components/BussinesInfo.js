// Bussines rating, description, menu btn, open hours
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Businessinformation({business, navigation}){
  const { description, rating, openingHours } = business;

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.rating}>Rating: {rating} stars</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.openingHours}>Opening Hours: {openingHours}</Text>
        <Button title="View Menu" onPress={() => { navigation.navigate('Menu')}} />
      </View>
      <View>
        <Button title='find place' onPress={()=>{ navigation.navigate('JoinTable')}}></Button>
      </View>
    </View>
  );
};


// need to be passed to the globalstylesheet 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', // Light background color
        borderRadius: 10, // Rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      details: {
        marginTop: 20,
        padding: 10, // Add some padding for better separation
        backgroundColor: '#fff', // White background for details
        borderRadius: 10, // Rounded corners for details section
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333', // Darker text color
      },
      rating: {
        marginVertical: 5,
        color: '#777', // Light text color for rating
      },
      description: {
        marginBottom: 10,
        color: '#555', // Medium text color for description
      },
      openingHours: {
        fontWeight: 'bold',
        color: '#333',
      },
      menuButton: {
        color: "black",
        // Customize button styles as needed (consider rounded corners, background color)
      },
    });