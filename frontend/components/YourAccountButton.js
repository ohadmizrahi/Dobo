import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const YourAccountButton = () => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Your Account</Text>
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
        marginTop: 20, // Adjust the marginTop to move the button further down
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
    },
});

export default YourAccountButton;
