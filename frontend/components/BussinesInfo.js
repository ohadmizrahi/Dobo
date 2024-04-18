import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Businessinformation({ navigation }) {

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const businessData = {
    description: 'cozy restaurant serving delicious Italian food.',
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
          <Button title="View Menu" onPress={() => navigation.navigate('Menu')} />
        </View>
      </View>
      <View>
        <Button title='find place' color={'black'} onPress={() => navigation.navigate('JoinTable')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  details: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  info: {
    marginVertical: 5,
    color: '#000',
    marginLeft: 10,
  },
  align: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
