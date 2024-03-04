import { View, Text } from "react-native"; 
import { globalStyles } from '../styles/global';
import  Header  from './components/Header.js';

export default function SignIn() {
  return (
    <View>
      <Header/>
      <Text>SignIn</Text>
    </View>
  );
}