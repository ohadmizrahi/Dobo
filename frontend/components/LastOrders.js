import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const orders = [
    {
        id: '1',
        item: 'Classic Burger',
        price: '$10',
        payers: ['John', 'Alice'],
        progress: 'In Preparation',
    },
    {
        id: '2',
        item: 'Pizza Margarita',
        price: '$12',
        payers: ['Bob', 'Alice', 'Emily'],
        progress: 'Ready',
    },
    // Add more orders as needed
];

const LatestOrderComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={[styles.header,styles.headerText]}>Latest Orders</Text>
            <View style={styles.orderContainer}>
                {orders.map(order => (
                    <View key={order.id} style={styles.orderItem}>
                        <Text style={styles.orderText}> {order.item}</Text> 
                        <Text style={styles.orderText}>{order.payers.join(', ')}</Text>
                        <Text style={styles.orderText}> {order.price}</Text>
                        <Text style={styles.orderText}> {order.progress}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    header: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#97DECC',
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    orderContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginVertical: 10,
        padding: 20,
        width: '100%',
        position: 'relative',
    },
    orderItem: {
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align text vertically
        flex: 1, // Fill remaining space in the row
        padding: 10,
    },
    orderText: {
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default LatestOrderComponent;
