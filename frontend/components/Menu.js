// Menu of the items that the bussines has
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


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


export default function Menu ({navigation, isOrderScreen , data}){
  const [products, setProducts] = useState([]);
  menuData= data;
  
  useEffect(() => {
    setProducts(menu);
  }, []);

  const renderProducts = ({ item }) => {
    const bb = item.image;
    return (
      <View>
        {isOrderScreen ? (
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Item", { itemID: item.id})}>
            <View style={styles.itemDetailsContainer} key={item.id}>
              <Image source={{ uri: bb }} style={styles.imageContainer} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Price:{item.price}$</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={[styles.itemDetailsContainer,styles.menuItem]}>
            <Image source={{ uri: bb }} style={styles.imageContainer} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Price:{item.price}$</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProducts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row', // Change to row for horizontal layout
        margin: 3,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    imageContainer: {
        width: 100, // Set a fixed width for the image container
        height: 100, // Set a fixed height for the image container
        marginRight: 10, // Add margin for spacing
        borderRadius: 8, // Maintain rounded corners
        overflow: 'hidden', // Clip image content within container
    },
    itemDetailsContainer: {
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align text vertically
        flex: 1, // Fill remaining space in the row
        padding: 10,
    },
    itemName: {
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, // Allow text to wrap if name is long
        paddingLeft: 10,
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
    },
});
