import { View, Text } from "react-native"; 
import { globalStyles } from '../styles/global';
import  Header  from './components/Header.js'; // maybe without the header, the page will not have a header

export default function home() {   
  return (
    <View>
      <Header/>
      <Text>Home</Text>
    </View>
  );
}