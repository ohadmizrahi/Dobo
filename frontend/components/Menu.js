// Menu of the items that the bussines has
import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const changes = [
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
]
function Section({ title, items, isOrderScreen, navigation }) {
  return (
    <View>
        <View>
          {isOrderScreen ? ( // askes if the screen is Order 
          <View style={[styles.categoryHeader,styles.categoryOrderColor]}>
            <Text style={styles.categoryOrderText}>{title}</Text>
          </View>
          ):( // Menu screen
          <View style={[styles.categoryHeader,styles.categoryMenuColor]}>
            <Text style={styles.categoryMenuText}>{title}</Text>
          </View>
          )}
        </View>
      <FlatList 
        data={items}
        keyExtractor={(item) => item.itemid}
        renderItem={({item}) => (
          <View>
          {isOrderScreen ? ( // Order screen
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Item", { item: item, changes: changes })}>
              <View style={styles.itemDetailsContainer} key={item.itemid}>
                <Image source={{ uri: item.image || 'https://img.taste.com.au/UdoSmp6V/taste/2017/03/nutella-icecream-124606-1.jpg' }} style={styles.imageContainer} />
                <Text style={[styles.itemName, styles.itemTextOrder]}>{item.name}</Text>
                <Text style={[styles.itemPrice,styles.itemTextOrder]}>{item.price}$</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={[styles.itemDetailsContainer, styles.menuItem]}>
              <Image source={{ uri: item.image || 'https://img.taste.com.au/UdoSmp6V/taste/2017/03/nutella-icecream-124606-1.jpg' }} style={styles.imageContainer} />
              <Text style={[styles.itemName,styles.itemTextMenu]}>{item.name}</Text>
              <Text style={[styles.itemPrice,styles.itemTextMenu]}>{item.price}$</Text>
            </View>
          )}
        </View>
        )}
      />
    </View>
  );
}
export default function Menu ({navigation, isOrderScreen , data}){
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const tempGroups = []
    const menu = data.menu
    console.log('menu', menu);
    for (const groupName in menu) {
      const tempGroup = {}
      console.log('key', groupName);
      if (menu[groupName].length === 0) {
        continue
      }
      tempGroup['group'] = groupName
      tempGroup['items'] = menu[groupName]
      tempGroups.push(tempGroup)
    }
    setGroups(tempGroups);
  }, [data]);


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
      {groups.map((group, index) => (
        <Section key={index} title={group.group} items={group.items} isOrderScreen={isOrderScreen} navigation={navigation} />
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row', // Change to row for horizontal layout
    margin: 3,
    borderBottomWidth: 2, // Add a thin line at the bottom
    borderBottomColor: '#CCCCCC', // Color of the line
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
    flex: 1, 
    paddingRight: 50,
    textAlign: 'center',
  },
  itemTextMenu:{
    color: 'black',
  },
  itemTextOrder:{
    color: 'white',
  },
  itemPrice: {
    fontSize: 14,
  },
  categoryHeader: {
    fontWeight: 'bold',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  categoryOrderColor: {
    backgroundColor: 'white',
  },
  categoryOrderText: {
    color: 'black',
    fontSize: 20,
  },
  categoryMenuColor: {
    backgroundColor: '#3D3D3D',
  },
  categoryMenuText: {
    color: 'white',
    fontSize: 20,
  },
});
