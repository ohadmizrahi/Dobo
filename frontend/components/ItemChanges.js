import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import menu from '../data/menuDate';
import AddItemBtn from './AddItemBtn';

const ItemChanges = () => {

  const Item = menu[2];
  const [price, setPrice] = useState(Item.price);

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
      <Image source={{ uri: Item.image }} style={styles.image} />
      <Text style={styles.itemName}>{Item.name}</Text>
      <Text style={styles.itemDescription}>{Item.description}</Text>
      {Object.entries(Item.changes[0]).map(([changeType, options]) =>
        renderChangeOptions(changeType, options)
      )}
      <AddItemBtn price={price} />
      <Button title="Print Selected Options" onPress={handlePrintSelectedOptions} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
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
