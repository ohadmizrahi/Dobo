
export const User = (props) => {
    return (
        <div>
        <p>{props.fullName}</p>
        <p>{props.email}</p>
        <p>{props.phoneNumber}</p>
        <p>{props.birthDate}</p>
        <p>{props.password}</p>
        <p>{props.image}</p>
        </div>
    );
}

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker'; 

// const TableReservationForm = () => {
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [text, setText] = useState('Empty');
//   const [tableSize, setTableSize] = useState('');
//   const [hour, setHour] = useState('');
//   const [preference, setPreference] = useState('');
//   const [specialRequest, setSpecialRequest] = useState('');

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);

//     let tempDate = new Date(currentDate);
//     let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
//     let fTime= 'Hours:' + tempDate.getHours() + ':' + tempDate.getMinutes();

//     setText(fDate + '\n' + fTime);
//   }

//   const showMode = (currentMode)=> {
//     setShow(true);
//     setMode(currentMode);
//   }

//   const handleSubmit = () => {
//     // Check for empty date before logging or submitting
//     if (!date) {
//       alert('Please select a date for your reservation.');
//       return;
//     }

//     console.log('Reservation submitted:', { date, tableSize, hour, preference, specialRequest, text});

//     // Clear form fields after submission (optional)
//     // setDate('');
//     // setTableSize('');
//     // setHour('');
//     // setPreference('');
//     // setSpecialRequest('');
//     // setText('');

//     // You can decide if you want to clear the form fields here or keep them for the next reservation
//   }

//   return (
//     <View>
//       <Text>Select Date</Text>
//       <Button title='Pick Date' onPress={()=> showMode('date')} />
//       {show && (
//         <DateTimePicker testID='dateTimePicker' value={date} mode={mode} onChange={onChange} />
//       )}
//       <Text>Table Size</Text>
//       <Picker selectedValue={tableSize} onValueChange={setTableSize}>
//         <Picker.Item label="Select Table Size" value="" />
//         <Picker.Item label="1 Person" value="1" />
//         <Picker.Item label="2 People" value="2" />
//         <Picker.Item label="3 People" value="3" />
//         <Picker.Item label="4 People" value="4" />
//         <Picker.Item label="5+" value="5+" />
//       </Picker>
//       <Text>Select Hour</Text>
//       <Button title='Pick Time' onPress={()=> showMode('time')}/>
//       {show && (
//         <DateTimePicker testID='dateTimePicker' value={date} mode={mode} onChange={onChange} />
//       )}
//       <Text>Preference</Text>
//       <TextInput value={preference} onChangeText={setPreference} placeholder="Enter preference (optional)" />
//       <Text>Special Request (Optional)</Text>
//       <TextInput value={specialRequest} onChangeText={setSpecialRequest} placeholder="Enter special request" />
//       <Button title="Send Reservation" onPress={handleSubmit} />
//       <Text>selected Date & Time:{text}</Text>
//     </View>
//   );
// };

// export default TableReservationForm;
