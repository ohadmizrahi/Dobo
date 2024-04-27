import { ScrollView, StatusBar, StyleSheet, View, useWindowDimensions  } from 'react-native';
import { useState, useEffect } from 'react';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';
import ExitSign from '@Components/ExitSign';


export default function OrderScreen({ navigation }) {
  const [buttonPosition, setButtonPosition] = useState({ bottom: 20 });
  const windowWidth = useWindowDimensions().width;

  function handleViewOrder() {
    navigation.navigate('OrderCart');
  }

  // function handleScroll(event) {
  //   const scrollPosition = event.nativeEvent.contentOffset.y;
  //   const maxScroll = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
    
  //   // Calculate button position based on scroll position
  //   const buttonBottom = 20 + (maxScroll - scrollPosition);


  //   // Update button position
  //   setButtonPosition({ bottom: buttonBottom});
  // }

  function handleViewOrder() {
    navigation.navigate('OrderCart');
  }

  return (
    <View style={globalStyles.screenColor} >
        <StatusBar barStyle="light-content" />
        <ExitSign/>
        <LogoImage/>
        <ScrollView scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 60 }}>
            <Menu navigation={navigation} isOrderScreen={true} />
        </ScrollView>
        <View style={[styles.floatingButtonContainer, buttonPosition]}>
            <CustomButton handlePress={handleViewOrder} screen='OrderCart' title={'View Order'} />
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    zIndex: 1, // Ensure the button appears above other elements
  },
});