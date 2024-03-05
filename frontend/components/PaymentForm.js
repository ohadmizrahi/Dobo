import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (value) => {
        setCardNumber(value);
    };

    const handleExpiryDateChange = (value) => {
        setExpiryDate(value);
    };

    const handleCvvChange = (value) => {
        setCvv(value);
    };

    const handleSubmit = () => {
        // Perform validation and submit payment

        // Reset form fields
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
    };

    return (
        <View>
            <Text>Card Number:</Text>
            <TextInput
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
            />

            <Text>Expiry Date:</Text>
            <TextInput
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
            />

            <Text>CVV:</Text>
            <TextInput
                placeholder="CVV"
                value={cvv}
                onChangeText={handleCvvChange}
            />

            <Button title="Submit Payment" onPress={handleSubmit} />
        </View>
    );
};

export default PaymentForm;
