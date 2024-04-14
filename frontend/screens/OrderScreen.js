import React from 'react';
import { View , Text,ScrollView } from 'react-native';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import MoveScreenButton from '@Components/MoveScreenBtn';

export default function OrderScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
        <LogoImage/>
        <MoveScreenButton navigation={navigation} screen='OrderCart' title={'View Order'} />
        <Menu navigation={navigation} isOrderScreen={true} />
    </ScrollView>
  );
}


