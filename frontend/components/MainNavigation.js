import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen.js';
import ItamScreen from '../screens/ItemScreen.js';
import BusinessInfoScreen from '../screens/businessInfoScreen.js';
import JoinTableScreen from '../screens/JoinTableScreen.js';
import OrderScreen from '../screens/OrderScreen.js';
import PayScreen from '../screens/PayScreen.js';
import MenuScreen from '../screens/MenuScreen.js';
import OrderCartScreen from '../screens/OrderCartScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import SignInScreen from '../screens/SignInScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import TableReservationScreen from '../screens/TableReservationScreen.js';
import TableStatusScreen from '../screens/TableStatusScreen.js';

const Stack = createStackNavigator();

export default function MainNavigation() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Item" component={ItamScreen} />
        <Stack.Screen name="BusinessInfo" component={BusinessInfoScreen} />
        <Stack.Screen name="JoinTable" component={JoinTableScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="OrderCart" component={OrderCartScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TableReservation" component={TableReservationScreen} />
        <Stack.Screen name="TableStatus" component={TableStatusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
