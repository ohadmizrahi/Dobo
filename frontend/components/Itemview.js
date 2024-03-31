import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ItemView({ route, navigation }) {
  const { itemID, itemName, itemPrice, bb } = route.params; 
  const [recipe, setRecipe] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setRecipe({ itemID, itemName, itemPrice, bb });
  }, [itemID, itemName, itemPrice, bb]);

  const handleAddToCart = () => {
    const selectedItem = { itemID, itemName, itemPrice };
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const handleGoToCart = () => {
    navigation.navigate("OrderCart", { SelectedItems: selectedItems});
  };

  return (
    <View style={styles.container}>
      {recipe ? (
        <React.Fragment>
          <Text style={styles.recipeName}>{recipe.itemName}</Text>
          <Text style={styles.recipePrice}>Price: {recipe.itemPrice}</Text>
        </React.Fragment>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      {/* Go to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleGoToCart}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 0,
    backgroundColor: '#fff'
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipePrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
});