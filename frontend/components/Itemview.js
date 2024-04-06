import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import menu from '../data/menuDate';
import { useCartState } from './CartStateContext';

export default function ItemView({ route, navigation }) {
  const { itemID } = route.params;
  const Item = menu.find(item => item.id === itemID);
  const { cartState, setCartState } = useCartState();


  const setDataToCartState = (itemToAdd) => {
    if (cartState === null) {
      setCartState([itemToAdd])
    } else {
      setCartState([...cartState, itemToAdd]);
    }
  };


  const handleAddToCart = () => {
    const selectedItem = Item;
    console.log(selectedItem);
    setDataToCartState(selectedItem);
    navigation.navigate('Order',{ SelectedItems: cartState});
  };

  const handleGoToCart = () => {
    navigation.navigate("OrderCart", { SelectedItems: cartState});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      <View style={styles.price}><Text>{Item.price}$</Text></View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleGoToCart}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
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
  price: {
    backgroundColor: "grey",
    fontSize: 20,
    borderRadius: 30,
    width: 50,
    height: 50,
    fontWeight: "bold",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});