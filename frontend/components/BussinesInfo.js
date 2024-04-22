import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Businessinformation({ navigation }) {

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const businessData = {
    description: "Nestled in the heart of the bustling city center, our cozy restaurant offers an inviting atmosphere and a delightful culinary experience. Our menu features a tantalizing selection of authentic Italian dishes crafted with the finest ingredients and traditional recipes passed down through generations. From handcrafted pasta dishes to wood-fired pizzas and decadent desserts, every bite is a celebration of Italian gastronomy.",
    rating: 4.5,
    openingHours: '10:00 - 22:00', 
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.align}>
          <Icon name="smile-o" size={20} />
          <Text style={styles.info}>{businessData.rating}</Text>
        </View>
        <View style={styles.align}>
          <Icon name="clock-o" size={20} />
          <Text style={styles.info}>{businessData.openingHours}</Text>
          {/* Add Dropdown for days of the week */}
        </View>
        <View style={styles.align}>
          <Icon name="info-circle" size={20} />
          <Text style={styles.info}>{businessData.description}</Text>
        </View>
        <View style={styles.align}>
          <Icon name="book" size={20} />
            <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.menuText}>Menu</Text>
            </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.findPlace} onPress={() => navigation.navigate('TableReservation')}>
      <Text style={styles.findText}>Find Place</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  details: {
    padding: 10,
    borderRadius: 10,
  },
  info: {
    marginVertical: 4,
    color: '#000',
    marginLeft: 10,
  },
  align: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Change this line
    marginBottom: 10,
  },
  menuBtn: {
    backgroundColor: '#3B4248',
    borderRadius: 20,
    marginLeft: 5,
    height: 25,
    width: 60,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  menuText: {
    color: 'white',
  },
  findPlace: {
    backgroundColor: '#3B4248',
    borderRadius: 40,
    height: 50,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    position: 'absolute',
    bottom: 40,
  },
  findText: {
    color: 'white',
    fontSize: 20,
  },
});
