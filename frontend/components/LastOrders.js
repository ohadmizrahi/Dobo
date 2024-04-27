import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormContainer from '@Components/FormContainer';

const orders = [
    {
        id: '1',
        item: 'Classic Burger',
        price: 10,
        payers: ['John', 'Alice'],
        progress: 'In Progress',
    },
    {
        id: '2',
        item: 'Pizza Margarita',
        price: 12,
        payers: ['Bob', 'Alice', 'Emily'],
        progress: 'Ready',
    },
    // Add more orders as needed
];

const LatestOrder = ({ orders }) => {
    
    return (
        <FormContainer formName='Latest Orders'>
                {orders.map(order => (
                    <View key={order.orderid} style={styles.orderItem}>
                        <Text style={styles.orderText}> {order.itemname}</Text> 
                        <Text style={styles.orderText}>{order.clients.map(client => client.clientName).join(', ')}</Text>
                        <Text style={styles.orderText}> {order.itemprice}$</Text>
                        <Text style={styles.orderText}> {order.status}</Text>
                    </View>
                ))}
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
    },
    orderText: {
        alignItems: 'center',
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default LatestOrder;
