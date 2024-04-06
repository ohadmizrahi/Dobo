import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const InvoiceComponent = () => {
    const [invoiceList, setInvoiceList] = useState([
        {
            id: '1',
            item: 'Classic Burger',
            price: 10,
            payers: ['John', 'Alice']
        },
        {
            id: '2',
            item: 'Pizza Margarita',
            price: 12,
            payers: ['Bob', 'Alice', 'Emily']
        },
    ]);

    const handleRemoveItem = (id) => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to remove this item?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        const updatedInvoices = invoiceList.filter(item => item.id !== id);
                        setInvoiceList(updatedInvoices); // Update state with filtered list
                        console.log('Item removed:', id);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.invoiceItem}>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.invoiceDetails}>
                <Text style={styles.invoiceText}>{item.item}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.invoiceText}>${item.price}</Text>
                </View>
                <Text style={styles.invoiceText}>{item.payers.join(', ')}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header "You pay on" */}
            <Text style={styles.header}>You pay on</Text>
            {/* Invoice List */}
            <FlatList
                data={invoiceList} // Use updated invoiceList state
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
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
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
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align text vertically
        flex: 1, // Fill remaining space in the row
        padding: 10,
    },
    invoiceText: {
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    priceContainer: {
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
});

export default InvoiceComponent;
