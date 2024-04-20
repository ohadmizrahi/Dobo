import { ScrollView, StatusBar } from 'react-native';
import CustomButton from '@Components/CustomButton';
import LatestOrderComponent from '@Components/LastOrders';
import LogoImage from '@Components/DoboLogo';
import { globalStyles } from '@Root/globalStyles';
import FriendsInTable from '@Components/FriendInTable';

export default function TableStatusScreen({ navigation }) {
  function handlePayNow() {
    navigation.navigate('Pay');
  }

  function handleOrderNow() {
    navigation.navigate('Order');
  }
  return (
    <ScrollView style={globalStyles.screenColor}>
      <StatusBar barStyle="light-content" />
      <LogoImage />
      <CustomButton handlePress={handleOrderNow} title='Order Now' />
      <LatestOrderComponent />
      <FriendsInTable />
      <CustomButton handlePress={handlePayNow} title={'Pay Now'} backgroundColor={'red'}/>
    </ScrollView>
  );
}