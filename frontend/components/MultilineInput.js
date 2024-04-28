import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import FormContainer from '@Components/FormContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MultilineInput({ label, value, onChange, placeholder, error, icon, onSubmit }) {
    const handleButtonPress = () => {
      onSubmit();
    };

    return (
        <View style={{ marginTop: -5 }}>
          <FormContainer label={label} error={error} displayHeadline={false}>
            <View style={styles.container}>
              <Icon name={icon} size={24} color="black" style={styles.icon} />
              <Text style={globalStyles.label}>{label}</Text>
            </View>
            <TextInput
              style={[styles.input, styles.inputFocused]}
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              multiline
            />
            <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
              <Text style={{ color: "white" }}>Send Reservation</Text>
            </TouchableOpacity>
          </FormContainer>
        </View>
      );
    }

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    width: 300,
  },
  inputFocused: {
    borderColor: "#ccc",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 50,
    marginBottom: -40,
    backgroundColor: "#3B4248",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.36,
  },
});
