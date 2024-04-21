import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const YourAccountButton = ({ invoices }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            let totalPrice = 0;
            invoices.forEach(item => {
                totalPrice += item.price;
            });
            return totalPrice.toFixed(2);
        };

        const newTotal = calculateTotalPrice();
        setTotal(newTotal);
    }, [invoices]);

    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Your Account</Text>
            <Text style={styles.totalText}>Total: ${total}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#97DECC',
        borderRadius: 50,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
    },
    totalText: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
});

export default YourAccountButton;
