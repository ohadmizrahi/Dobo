import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import { globalStyles } from '../globalStyles';
import DoboLogo from '../components/DoboLogo';
import JoinTableForm from '../components/JoinTableForm';
import ConnectedFriends from '../components/ConnectedFriends';
import LineAcross from '../components/LineAcross';
import TableLink from '../components/TableLink';
import GoToTableButton from '../components/GoToTableBtn';
export default function JoinTableScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <DoboLogo />
      <JoinTableForm />
      <ConnectedFriends navigation={navigation} />
      <LineAcross text='OR' />
      <TableLink />
      <GoToTableButton navigation={navigation} />
    </ScrollView>
  );
}