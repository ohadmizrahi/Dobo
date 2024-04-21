<<<<<<< HEAD
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import { globalStyles } from '../globalStyles';
import LogoImage from '../components/DoboLogo';
import MoveScreenButton from '../components/MoveScreenBtn';
import TableHeader from '../components/TableHeader';
=======
import { ScrollView,StatusBar } from 'react-native';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';
import ExitSign from '@Components/ExitSign';

>>>>>>> master

export default function OrderScreen({ navigation }) {

  function handleViewOrder() {
    navigation.navigate('OrderCart');
  }

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <ScrollView style={globalStyles.screenColor}>
        <LogoImage />
        <TableHeader tableNumber={555} showPencilButton={false}/>
        <Menu navigation={navigation} isOrderScreen={true} />
      </ScrollView>
      <MoveScreenButton navigation={navigation} screen='OrderCart' title={'View Order'} />
    </View>
=======
    <ScrollView style={globalStyles.screenColor}>
        <StatusBar barStyle="light-content" />
        {/* <ExitSign/> */}
        <LogoImage/>
        <Menu navigation={navigation} isOrderScreen={true} />
        <CustomButton handlePress={handleViewOrder} screen='OrderCart' title={'View Order'} />
    </ScrollView>
>>>>>>> master
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
