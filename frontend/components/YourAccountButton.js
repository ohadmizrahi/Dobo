import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const invoices = [10, 22]; // Array of numbers

const Calculate = () => {
    let price = 0;
    invoices.forEach((invoice) => {
        price += parseFloat(invoice); // Directly sum the numbers
    });
    return price.toFixed(2);
}

const YourAccountButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Your Account</Text>
            <Text style={styles.totalText}>Total: ${Calculate()}</Text>
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
