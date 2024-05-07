import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ActivityTimeSection({ activityTime}) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('Sunday');
  
    const daysOfWeek = [
        'Sunday', 'Monday',
        'Tuesday', 'Wednesday',
        'Thursday', 'Friday',
        'Saturday'
    ];
    const activityTimeMap = activityTime.reduce((acc, curr) => {
      acc[daysOfWeek[curr.day - 1]] = { 
        open: curr.open.split(':').slice(0, 2).join(':'),
        close: curr.close.split(':').slice(0, 2).join(':')
    };
      return acc;
    }, {});
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    const handleDayChange = (day) => {
      setSelectedDay(day);
      toggleModal();
    };
  
    return (
    <View style={styles.align}>
      <Icon name="clock-o" size={20} />
      
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.info}>
            <Text>{selectedDay}</Text>
          <Text >{`${activityTimeMap[selectedDay].open} - ${activityTimeMap[selectedDay].close}` } </Text>
        </View>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} >
        {daysOfWeek.map((day, index) => (
          <Button color='white' key={index} title={day} onPress={() => handleDayChange(day)} />
        ))}
        <Button color='#97DECC' title="Close" onPress={toggleModal} />
      
      </Modal>
    </View>
    )
  }

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
})