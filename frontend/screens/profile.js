import { View, Text } from "react-native"; 
import { globalStyles } from '../styles/global';
import  Header  from './components/Header.js';

export default function Profile() {
  return (
    <View>
      <Header/>
      <Text>Profile</Text>
    </View>
  );
}