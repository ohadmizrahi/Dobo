import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const invoices = [
    {
        id: '1',
        item: 'Classic Burger',
        price: '$10',
        payers: ['John', 'Alice']
    },
    {
        id: '2',
        item: 'Pizza Margarita',
        price: '$12',
        payers: ['Bob', 'Alice', 'Emily']
    },

];

const InvoiceComponent = () => {
    const renderItem = ({ item }) => (
        <View style={styles.invoiceItem}>
            <TouchableOpacity style={styles.removeButton}>
                <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.invoiceDetails}>
                <Text style={styles.invoiceText}>{item.item}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.invoiceText}>{item.price}</Text>
                </View>
                <Text style={styles.invoiceText}>{item.payers.join(', ')}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={invoices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    invoiceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    removeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    removeButtonText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
    },
    invoiceDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    invoiceText: {
        fontSize: 16,
        color: '#333',
    },
    priceContainer: {
        
    },

});

export default InvoiceComponent;
