import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Businessinformation({ navigation, data }) {
const handleMenu = () => {
  navigation.navigate('Menu', { menu: data.menu, imageurl: data.imageurl, name: data.name});
}

const handleFindPlace = () => {
  navigation.navigate('TableReservation', { businessId: data.businessid, imageurl: data.imageurl, name: data.name});

}

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.align}>
          <Icon name="smile-o" size={20} />
          <Text style={styles.info}>{data.rank}</Text>
        </View>
        <View style={styles.align}>
          <Icon name="clock-o" size={20} />
          <Text style={styles.info}>{data.activityTime[0]?.open}-{data.activityTime[0]?.close}</Text>
          {/* Add Dropdown for days of the week */}
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
});
