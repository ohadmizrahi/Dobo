import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import { globalStyles } from '../globalStyles';
import DoboLogo from '../components/DoboLogo';
import JoinTableForm from '../components/JoinTableForm';
import ConnectedFriends from '../components/ConnectedFriends';
import LineAcross from '../components/LineAcross';
import TableLink from '../components/TableLink';
import MoveScreenButton from '../components/MoveScreenBtn';

export default function JoinTableScreen({ navigation, route }) {
  const qrData = route.params ? route.params.qrData : null;
  return (
    <ScrollView style={globalStyles.screenColor}>
      <DoboLogo />
      <JoinTableForm qrData={qrData} />
      <ConnectedFriends navigation={navigation} />
      <LineAcross text='OR' />
      <TableLink/>
      <MoveScreenButton navigation={navigation} title='Go to Table' screen='TableStatus' />
    </ScrollView>
  );
}