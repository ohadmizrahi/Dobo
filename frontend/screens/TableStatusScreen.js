import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import MoveScreenButton from '../components/MoveScreenBtn';
import LatestOrderComponent from '../components/LastOrders';
import LogoImage from '../components/DoboLogo';
import { globalStyles } from '../globalStyles';
import FriendsInTable from '../components/FriendInTable';
import PayNowButton from '../components/PayNowBtn';

export default function TableStatusScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <LogoImage />
      <MoveScreenButton navigation={navigation} title='Order Now' screen='Order'/>
      <LatestOrderComponent />
      <FriendsInTable/>
      <PayNowButton navigation={navigation}/>
    </ScrollView>
  );
}