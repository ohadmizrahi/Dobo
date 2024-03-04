import { View, Text } from "react-native"; 
import { globalStyles } from '../styles/global';
import  Header  from './components/Header.js';

export default function Order() {
  return (
    <View>
      <Header/>
      <Text>Order</Text>
    </View>
  );
}