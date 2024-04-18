import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { sendPostRequest } from '@Utils/request/send.js';
import { storeData, getAllData } from '@Utils/storage/asyncStorage';
import { handleResponse } from '@Utils/response/handler';

export const Places = ({title}) => {
    const navigation = useNavigation();
    const [selectedBusinessId, setSelectedBusinessId] = useState(null);

    const places = [
        {
            "businessId": "001",
            "name": "Bella Italia",
            "rate": 4.5,
            "type": "Italian",
            "description": "Authentic Italian cuisine in a cozy atmosphere. Specializing in pasta, pizza, and traditional Italian desserts.",
            "activity_hours": "Monday-Sunday, 11:00 AM - 10:00 PM",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "002",
            "name": "Tokyo Sushi Bar",
            "rate": 4.8,
            "type": "Japanese",
            "description": "Sushi and sashimi made from fresh, high-quality ingredients. Offers a variety of traditional Japanese dishes.",
            "activity_hours": "Monday-Saturday, 12:00 PM - 10:30 PM; Sunday, Closed",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "003",
            "name": "The Croissant",
            "rate": 4.3,
            "type": "French Bakery",
            "description": "Authentic French bakery known for its freshly baked croissants, baguettes, and pastries. Also serves coffee and tea.",
            "activity_hours": "Tuesday-Sunday, 7:00 AM - 7:00 PM; Monday, Closed",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "004",
            "name": "Spice Kingdom",
            "rate": 4.6,
            "type": "Indian",
            "description": "Offers a wide range of flavorful Indian dishes, including curry, tandoori, and biryani. Vegetarian and non-vegetarian options available.",
            "activity_hours": "Monday-Saturday, 11:30 AM - 10:00 PM; Sunday, 12:00 PM - 9:30 PM",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "005",
            "name": "El Rancho Grill",
            "rate": 4.4,
            "type": "Mexican",
            "description": "Authentic Mexican grill specializing in tacos, burritos, and fajitas. Also serves margaritas and other Mexican beverages.",
            "activity_hours": "Monday-Sunday, 11:00 AM - 11:00 PM",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "006",
            "name": "Greek Taverna",
            "rate": 4.7,
            "type": "Greek",
            "description": "Traditional Greek cuisine with a modern twist. Offers souvlaki, gyros, Greek salads, and seafood dishes.",
            "activity_hours": "Wednesday-Monday, 12:00 PM - 11:00 PM; Tuesday, Closed",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "007",
            "name": "BBQ Pitmaster",
            "rate": 4.9,
            "type": "Barbecue",
            "description": "Authentic barbecue joint known for its slow-smoked meats, ribs, brisket, and pulled pork. Sides include coleslaw, baked beans, and cornbread.",
            "activity_hours": "Thursday-Sunday, 4:00 PM - 10:00 PM; Monday-Wednesday, Closed",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "008",
            "name": "Veggie Delight",
            "rate": 4.2,
            "type": "Vegetarian",
            "description": "Offers a diverse selection of vegetarian and vegan dishes, including salads, wraps, sandwiches, and plant-based burgers.",
            "activity_hours": "Monday-Sunday, 10:00 AM - 9:00 PM",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        },
        {
            "businessId": "009",
            "name": "Seafood Cove",
            "rate": 4.6,
            "type": "Seafood",
            "description": "Fresh seafood restaurant offering a variety of fish, shrimp, crab, and lobster dishes. Also serves clam chowder and seafood pasta.",
            "activity_hours": "Tuesday-Sunday, 12:00 PM - 9:00 PM; Monday, Closed",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"
        },
        {
            "businessId": "010",
            "name": "Spice Route",
            "rate": 4.5,
            "type": "Asian Fusion",
            "description": "Fusion restaurant combining flavors from various Asian cuisines, including Thai, Chinese, and Vietnamese. Offers stir-fries, noodles, and sushi.",
            "activity_hours": "Monday-Saturday, 11:00 AM - 10:30 PM; Sunday, 12:00 PM - 9:30 PM",
            "image": "https://www.tiuli.com/image/cea91d38ee5eecf992db4e3d4fae4c48.jpg?&width=520&height=450"

        }
    ]

    const handleBusinessPress = async (businessId) => {
        setSelectedBusinessId(businessId);
        try {
          const response = await sendPostRequest('/api/business/info', { businessId });
            await handleResponse(response, navigation, async (data) => {
            await storeData('businessId', data);
            navigation.navigate('BusinessInfo');
        });
    
        } catch (error) {
          console.log('Error:', error);
          Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={places}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleBusinessPress(item.businessId)}>
                        <View style={styles.place}>
                            <Image style={styles.image} source={{ uri: item.image }} />
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.type}>{item.type}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.businessId.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                ListEmptyComponent={() => <Text>No places found</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:5,
        marginTop: 10,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    place: {
        width: 130,
        height: 130,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: '#333',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start',

    },
    type: {
        fontSize: 14,
        color: '#666',
        alignSelf: 'flex-start',
    },
    image: {
        width: 130,
        height: 80,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignSelf: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        color: '#EFEFEF',
        alignSelf: 'center',
        marginBottom: 10,
    },
});