import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TableHeader = ({ tableNumber, showPencilButton }) => {
  const handleIconPress = () => {
    // Implement functionality for pencil button press here
    console.log('Pencil button pressed');
  };

  return (
    <View style={styles.head}>
      {showPencilButton && (
        <TouchableOpacity onPress={handleIconPress}>
          <View style={styles.iconContainer}>
            <Icon name="pencil" size={20} color="#333" style={styles.icon} />
          </View>
        </TouchableOpacity>
      )}
      <Text style={styles.text}>Table {tableNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#97DECC',
    marginTop: '10%',
    borderRadius: 50,
  },
  text: {
    padding: 10,
    fontSize: 20,
    borderRadius: 50,
    textAlign: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {},
});

export default TableHeader;
