import { ScrollView, StatusBar, StyleSheet, View, useWindowDimensions  } from 'react-native';
import { useState, useEffect } from 'react';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';
import ExitSign from '@Components/ExitSign';


export default function OrderScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;

  function handleViewOrder() {
    navigation.navigate('OrderCart');
  }

  return (
    <View style={globalStyles.screenColor}>
        <StatusBar barStyle="light-content" />
        <ExitSign/>
        <LogoImage/>
        <ScrollView scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 80 }}>
            <Menu navigation={navigation} isOrderScreen={true} />
        </ScrollView>
        <View style={styles.floatingButtonContainer}>
            <CustomButton handlePress={handleViewOrder} screen='OrderCart' title={'View Order'} />
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  floatingButtonContainer: {
    bottom: 40,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    zIndex: 1,
  },
});