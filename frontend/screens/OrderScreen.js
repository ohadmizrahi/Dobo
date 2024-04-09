import React from 'react';
import { View , Text,ScrollView } from 'react-native';
import Menu from '../components/Menu';
import {globalStyles} from '../globalStyles';
import LogoImage from '../components/DoboLogo';
import MoveScreenButton from '../components/MoveScreenBtn';

export default function OrderScreen({ navigation }) {
  return (
    <View style={globalStyles.screenColor}>
      <LogoImage/>
      <ScrollView>
        <MoveScreenButton navigation={navigation} screen='OrderCart' title={'View Order'} />
        <Menu navigation={navigation} isOrderScreen={true} />
      </ScrollView>
    </View>
  );
}


