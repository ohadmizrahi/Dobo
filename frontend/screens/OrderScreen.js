import { ScrollView,StatusBar } from 'react-native';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';
import ExitSign from '@Components/ExitSign';
export default function OrderScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
        <StatusBar barStyle="light-content" />
        {/* <ExitSign/> */}
        <LogoImage/>
        <Menu navigation={navigation} isOrderScreen={true} />
        <CustomButton navigation={navigation} screen='OrderCart' title={'View Order'} />
    </ScrollView>
  );
}


