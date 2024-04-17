import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect } from 'react';
import { storeData, getData } from '@Utils/storage/asyncStorage'; // Import getData here

const menu = [
  {
    id: 1,
    name: 'Burger',
    image: 'https://www.seriouseats.com/thmb/e16lLOoVEix_JZTv7iNyAuWkPn8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg',
    price: 15,
    description: 'A delicious burger',
    changes: [
      {
        cooked: {
          description: 'Choose how you want your burger cooked',
          options: ['Rare', 'Medium', 'Medium Well', 'Well Done'],
        },
        meatBall: {
          description: 'Choose the type of meatball',
          options: ['Beef', 'Chicken', 'Turkey', 'Veggie'],
        },
        cheese: {
          description: 'Choose the type of cheese',
          options: ['American', 'Swiss', 'Cheddar', 'Provolone'],
        },
        size: {
          description: 'Choose the size of the burger',
          options: ['100 grams', '200 grams + 5$', '300 grams + 10$'],
        },
        veggies: {
          description: 'Choose the veggies to remove',
          options: ['Lettuce', 'Tomato', 'Onion', 'Pickles'],
        },
        extras: {
          description: 'Choose extra toppings',
          options: ['Bacon +2$', 'Avocado +1$', 'Mushrooms +2$', 'Fried Egg +2$'],
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Pizza',
    image: 'https://www.allrecipes.com/thmb/0xH8n2D4cC97t7mcC7eT2SDZ0aE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg',
    price: 12,
    description: 'A delicious pizza',
    changes: [
      {
        crust: {
          description: 'Choose your crust type',
          options: ['Thin Crust', 'Regular Crust', 'Deep Dish'],
        },
        sauce: {
          description: 'Choose your sauce',
          options: ['Tomato Sauce', 'Pesto Sauce', 'Alfredo Sauce'],
        },
        toppings: {
          description: 'Choose your toppings',
          options: ['Pepperoni', 'Mushrooms', 'Onions', 'Peppers', 'Sausage', 'Extra Cheese'],
        },
      },
    ],
  },
  {
    id: 3,
    name: 'Salad',
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg?resize=1200%2C630',
    price: 10,
    description: 'A healthy salad',
    changes: [
      {
        base: {
          description: 'Choose your salad base',
          options: ['Mixed Greens', 'Romaine Lettuce', 'Spinach'],
        },
        protein: {
          description: 'Choose your protein',
          options: ['Grilled Chicken', 'Salmon', 'Tofu', 'Shrimp'],
        },
        dressing: {
          description: 'Choose your dressing',
          options: ['Balsamic Vinaigrette', 'Ranch Dressing', 'Caesar Dressing'],
        },
        toppings: {
          description: 'Choose your additional toppings',
          options: ['Tomatoes', 'Cucumbers', 'Carrots', 'Croutons', 'Parmesan Cheese'],
        },
      },
    ],
  },
  {
    id: 4,
    name: 'Sushi',
    image: 'https://tb-static.uber.com/prod/image-proc/processed_images/37c22d51d314e47b21c5bcaede28da23/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg',
    price: 20,
    description: 'Delicious sushi rolls',
    changes: [
      {
        rollType: {
          description: 'Choose your sushi roll type',
          options: ['California Roll', 'Spicy Tuna Roll', 'Dragon Roll', 'Rainbow Roll'],
        },
        fish: {
          description: 'Choose your fish',
          options: ['Tuna', 'Salmon', 'Yellowtail', 'Shrimp', 'Eel'],
        },
        toppings: {
          description: 'Choose your toppings',
          options: ['Avocado', 'Cucumber', 'Masago', 'Sesame Seeds'],
        },
        sauce: {
          description: 'Choose your sauce',
          options: ['Soy Sauce', 'Spicy Mayo', 'Eel Sauce', 'Wasabi'],
        },
      },
    ],
  },
  {
    id: 5,
    name: 'Pasta',
    image: 'https://images.aws.nestle.recipes/resized/0a0717810b73a1672a029c29788e557b_creamy_alfredo_pasta_long_left_1080_850.jpg',
    price: 14,
    description: 'Delicious pasta dishes',
    changes: [
      {
        pastaType: {
          description: 'Choose your pasta type',
          options: ['Spaghetti', 'Fettuccine', 'Penne', 'Ravioli', 'Linguine'],
        },
        sauce: {
          description: 'Choose your sauce',
          options: ['Marinara', 'Alfredo', 'Pesto', 'Carbonara', 'Arrabbiata'],
        },
        protein: {
          description: 'Choose your protein',
          options: ['Chicken', 'Shrimp', 'Meatballs', 'Sausage', 'Tofu'],
        },
        toppings: {
          description: 'Choose your toppings',
          options: ['Parmesan Cheese', 'Basil', 'Olives', 'Mushrooms', 'Sun-Dried Tomatoes'],
        },
      },
    ],
  },
];

export default function ItemAddToCart({ route, navigation }) {
  const { itemID } = route.params;
  const Item = menu.find(item => item.id === itemID);

  const [cartState, setCartState] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const data = await getData('cart');
      if (data) {
        setCartState(JSON.parse(data));
      }
    };
    fetchCartData();
  }, []);

  const handleAddToCart = async (person) => { // להוסיף תנאי אם הלחיצה הייתה עליי או על השולחן ולפי זה לשלוח את ההזמנה יחד עם האנשים ששותפים לה
    const itemClients = [];
    ClientsData = await getData('FriendsData')
    TableClients = JSON.parse(ClientsData)
    if (person==="Me") {
      itemClients.push(TableClients[0].id)
    }else if (person==="Table"){
      TableClients.forEach(client => {
        itemClients.push(client.id)
      })
    }
    Item.clients = itemClients
    const updatedCart = [...cartState, Item];
    setCartState(updatedCart);
    await storeData('cart', updatedCart);
    navigation.navigate('Order');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addToCartButton} onPress={()=> {handleAddToCart('Me')}}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Me</Text>
      </TouchableOpacity>
      <View style={styles.price}>
        <Text>{Item.price}$</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={()=> {handleAddToCart('Table')}}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.addToCartButtonText}>Add to Table</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  price: {
    backgroundColor: 'lightgrey',
    fontSize: 20,
    borderRadius: 30,
    width: 50,
    height: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
