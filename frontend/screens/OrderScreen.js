import React from 'react';
import { ScrollView } from 'react-native';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import MoveScreenButton from '@Components/MoveScreenBtn';
import ExitSign from '@Components/ExitSign';

export default function OrderScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
        <ExitSign/>
        <LogoImage/>
        <MoveScreenButton navigation={navigation} screen='OrderCart' title={'View Order'} />
        <Menu navigation={navigation} isOrderScreen={true} />
    </ScrollView>
  );
}


