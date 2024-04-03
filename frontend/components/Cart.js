import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";



export default function Cart({ route }) {
  const { SelectedItems } = route.params;
  if (!SelectedItems) {
    return (
      <View style={styles.container}>
        <Text>No items in the cart.</Text>
      </View>
    );
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    SelectedItems.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });
    return totalPrice.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      {SelectedItems.map((item) => (
        <View style={styles.itemContainer} key={item.id}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>Price: {item.price}$</Text>
        </View>
      ))}
      <Text style={styles.totalPrice}>Total Price: ${calculateTotalPrice()}</Text>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});