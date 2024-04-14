import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import MoveScreenButton from '@Components/MoveScreenBtn';
import LatestOrderComponent from '@Components/LastOrders';
import LogoImage from '@Components/DoboLogo';
import { globalStyles } from '@Root/globalStyles';
import FriendsInTable from '@Components/FriendInTable';

export default function TableStatusScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <LogoImage />
      <MoveScreenButton navigation={navigation} title='Order Now' screen='Order'/>
      <LatestOrderComponent />
      <FriendsInTable/>
      <MoveScreenButton navigation={navigation} screen={'Pay'} title={'Pay Now'} backgroundColor={'red'}/>
    </ScrollView>
  );
}