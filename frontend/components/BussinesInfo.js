import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import { getData } from '@Utils/storage/asyncStorage'; 
import { useState } from 'react';

export default function BussinesInfo({ navigation, data }) {
  const [selectedDay, setSelectedDay] = useState({});
  const [selectedHours, setSelectedHours] = useState({});
  const dayName = {};
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  for (let i = 0; i < daysOfWeek.length; i++) {
    dayName[i + 1] = daysOfWeek[i];
  }
const handleMenu = () => {
  navigation.navigate('Menu', { menu: data.menu, imageurl: data.imageurl, name: data.name});
}

const handleFindPlace = async () => {
  const userToken = await getData('userToken');
  userToken ? 
  navigation.navigate('TableReservation', { businessId: data.businessid, imageurl: data.imageurl, name: data.name}) :
  (() => {
    Alert.alert('You need sign in before making a reservation', 'Would you like to sign in?', [
      {
        text: 'Yes',
        onPress: () => navigation.navigate('SignIn'),
      },
      {
        text: 'No',
        cancelable: true,
      },
    ]);
  })

}
const handleDayChange = (day) => {
  setSelectedDay(day);
  const selectedDayData = data.activityTime.find(item => item.day === day);
  setSelectedHours({ open: selectedDayData.open, close: selectedDayData.close });
};

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.align}>
          <Icon name="smile-o" size={20} />
          <Text style={styles.info}>{data.rank}</Text>
        </View>
        <View style={styles.align}>
          <Icon name="clock-o" size={20} />
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Picker
              selectedValue={selectedDay}
              style={styles.pickercontainer}
              onValueChange={(itemValue) => handleDayChange(itemValue)}>
              {data.activityTime.map((item) => (
                <Picker.Item key={item.day} label={`${dayName[item.day]}: ${item.open.split(':').slice(0, 2).join(':')} - ${item.close.split(':').slice(0, 2).join(':')}`} value={item.day} style={styles.info}/>
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.align}>
          <Icon name="info-circle" size={20} />
          <Text style={styles.info}>{data.description}</Text>
        </View>
        <View style={styles.align}>
          <Icon name="book" size={20} />
          <TouchableOpacity style={styles.menuBtn} onPress={() => handleMenu()}>
            <Text style={styles.menuText}>Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.findPlace} onPress={() => handleFindPlace()}>
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
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  pickercontainer: {
    height: 50, 
    width: '93%',
  },
});
