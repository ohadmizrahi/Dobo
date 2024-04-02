import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PayNowButton = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pay')}>
      <Text style={styles.text}>Pay Now</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    marginTop: 20,
    width: '80%',
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default PayNowButton;
