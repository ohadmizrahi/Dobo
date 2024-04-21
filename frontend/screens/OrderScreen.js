import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Menu from '../components/Menu';
import { globalStyles } from '../globalStyles';
import LogoImage from '../components/DoboLogo';
import MoveScreenButton from '../components/MoveScreenBtn';
import TableHeader from '../components/TableHeader';

export default function OrderScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={globalStyles.screenColor}>
        <LogoImage />
        <TableHeader tableNumber={555} showPencilButton={false}/>
        <Menu navigation={navigation} isOrderScreen={true} />
      </ScrollView>
      <MoveScreenButton navigation={navigation} screen='OrderCart' title={'View Order'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
