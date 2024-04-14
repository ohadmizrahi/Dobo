import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import DoboLogo from '@Components/DoboLogo';
import JoinTableForm from '@Components/JoinTableForm';
import ConnectedFriends from '@Components/ConnectedFriends';
import LineAcross from '@Components/LineAcross';
import TableLink from '@Components/TableLink';
import MoveScreenButton from '@Components/MoveScreenBtn';

export default function JoinTableScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <DoboLogo />
      <JoinTableForm />
      <ConnectedFriends navigation={navigation} />
      <LineAcross text='OR' />
      <TableLink />
      <MoveScreenButton navigation={navigation} title='Go to Table' screen='TableStatus' />
    </ScrollView>
  );
}