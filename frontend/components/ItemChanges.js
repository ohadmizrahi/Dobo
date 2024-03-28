import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const ItemChanges = () => {
  const Burger = {
    id: 1,
    name: 'Burger',
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
  };

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelection = (changeType, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [changeType]: option,
    }));
  };

  const handlePrintSelectedOptions = () => {
    console.log(selectedOptions);
  };

  const renderChangeOptions = (changeType, options) => {
    return (
      <View style={styles.changeOptions} key={changeType}>
        <View style={styles.line} />
        <Text style={styles.changeDescription}>{options.description}</Text>
        {options.options.map((option) => (
          <View style={styles.optionContainer} key={option}>
              <TouchableOpacity
              style={[
                styles.circle,
                selectedOptions[changeType] === option && styles.filledCircle,
              ]}
              onPress={() => handleOptionSelection(changeType, option)}
            />
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOptions[changeType] === option,
              ]}
              onPress={() => handleOptionSelection(changeType, option)}
            >
              <Text>{option}</Text>
            </TouchableOpacity>

          </View>
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.itemName}>{Burger.name}</Text>
      <Text style={styles.itemDescription}>{Burger.description}</Text>
      {Object.entries(Burger.changes[0]).map(([changeType, options]) =>
        renderChangeOptions(changeType, options)
      )}
      <Button title="Print Selected Options" onPress={handlePrintSelectedOptions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  itemName: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 16,
  },
  line: {
    height: 1,
    backgroundColor: 'grey',
    marginBottom: 8,
  },
  changeOptions: {
    marginBottom: 16,
  },
  changeDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 8,
  },
  filledCircle: {
    backgroundColor: '#97DECC',
  },
});

export default ItemChanges;
