import { ScrollView } from 'react-native';
import CustomButton from '@Components/CustomButton';
import LatestOrderComponent from '@Components/LastOrders';
import LogoImage from '@Components/DoboLogo';
import { globalStyles } from '@Root/globalStyles';
import FriendsInTable from '@Components/FriendInTable';

export default function TableStatusScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <LogoImage />
      <CustomButton navigation={navigation} title='Order Now' screen='Order'/>
      <LatestOrderComponent />
      <FriendsInTable/>
      <CustomButton navigation={navigation} screen={'Pay'} title={'Pay Now'} backgroundColor={'red'}/>
    </ScrollView>
  );
}