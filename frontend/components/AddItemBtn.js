
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AddItemBtn = ({price}) => {

  return (
    <TouchableOpacity>
        <View style={styles.container}>
            <Text style={styles.text}>{price}</Text>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#474747",
    padding: 10,
    marginBottom: 30,
    borderRadius: 50,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

export default AddItemBtn;