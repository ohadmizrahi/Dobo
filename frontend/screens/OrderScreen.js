import { ScrollView } from 'react-native';
import Menu from '@Components/Menu';
import {globalStyles} from '@Root/globalStyles';
import LogoImage from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';

export default function OrderScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
        <LogoImage/>
        <CustomButton navigation={navigation} screen='OrderCart' title={'View Order'} />
        <Menu navigation={navigation} isOrderScreen={true} />
    </ScrollView>
  );
}


