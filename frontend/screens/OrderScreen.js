import { ScrollView,StatusBar } from 'react-native';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';
import ExitSign from '@Components/ExitSign';


export default function OrderScreen({ navigation }) {

  function handleViewOrder() {
    navigation.navigate('OrderCart');
  }

  return (
    <ScrollView style={globalStyles.screenColor}>
        <StatusBar barStyle="light-content" />
        {/* <ExitSign/> */}
        <LogoImage/>
        <Menu navigation={navigation} isOrderScreen={true} />
        <CustomButton handlePress={handleViewOrder} screen='OrderCart' title={'View Order'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
