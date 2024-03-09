// create account btn
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Assuming you're using react-navigation
import { globalStyles } from '../globalStyles';

const DontHaveAccount = ({ navigation }) => (
  <View style={globalStyles.formHeadLine}>
    <Text style={styles.text}>Don't have an account? </Text>
    <TouchableOpacity onPress={() => { navigation.navigate('SignUp')}}>
      <Text style={styles.link}>Click here to create</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange text and link horizontally
    alignItems: 'center', // Align text and link vertically
  },
  text: {
    fontSize: 16,
  },
  link: {
    color: '#0000EE', // Change to your desired link color
    fontWeight: 'bold',
  },
});

export default DontHaveAccount;
