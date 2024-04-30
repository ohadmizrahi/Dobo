import { ScrollView, StatusBar, StyleSheet, View, useWindowDimensions  } from 'react-native';
import { useState, useEffect } from 'react';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';
import ExitSign from '@Components/ExitSign';
import { getData } from '@Utils/storage/asyncStorage';


export default function OrderScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const [menu, setMenu] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await getData('virtualTable');
      if (data) {
        const parsedData = JSON.parse(data);
        setMenu({menu: parsedData.menu});
      }
    };
    fetchMenu();
  }, []);

  function handleViewOrder() {
    navigation.navigate('OrderCart');
  }

  return (
    <View style={globalStyles.screenColor}>
        <StatusBar barStyle="light-content" />
        <ExitSign/>
        <LogoImage/>
        <ScrollView scrollEventThrottle={16} contentContainerStyle={{ paddingBottom: 80 }}>
            <Menu navigation={navigation} isOrderScreen={true} data={menu} />
        </ScrollView>
        <View style={styles.floatingButtonContainer}>
            <CustomButton handlePress={handleViewOrder} title={'View Order'} />
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