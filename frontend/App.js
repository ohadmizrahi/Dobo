import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import  Header  from './components/Header.js';

import HomeScreen from './screens/HomeScreen.js';
import ItamScreen from './screens/ItemScreen.js';

const Stack = createNativeStackNavigator();

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Item" component={ItamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

