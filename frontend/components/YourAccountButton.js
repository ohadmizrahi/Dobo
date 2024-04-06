import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; // Import TouchableOpacity and Text components from React Native

const YourAccountButton = ({ invoices }) => {
    const [total, setTotal] = useState(0); // State to hold the total amount

    useEffect(() => {
        const calculateTotal = () => {
            let price = 0;
            // Sum the invoices array
            invoices.forEach((invoice) => {
                price += parseFloat(invoice);
            });
            return price.toFixed(2); // Format total to two decimal places
        };
        setTotal(calculateTotal()); // Update total when invoices prop changes
    }, [invoices]); // Run effect when invoices prop changes

    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Your Account</Text>
            <Text style={styles.totalText}>Total: ${total}</Text>
        </TouchableOpacity>
    );
};

// Styles for the button and text
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

export default YourAccountButton; // Export the component
