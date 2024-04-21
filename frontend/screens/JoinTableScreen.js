import { ScrollView, StatusBar } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import DoboLogo from '@Components/DoboLogo';
import JoinTableForm from '@Components/JoinTableForm';
import ConnectedFriends from '@Components/ConnectedFriends';
import LineAcross from '@Components/LineAcross';
import TableLink from '@Components/TableLink';
import CustomButton from '@Components/CustomButton';

export default function JoinTableScreen({ navigation, route }) {
  const qrData = route.params ? route.params.qrData : null;
  return (
    <ScrollView style={globalStyles.screenColor}>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      <JoinTableForm qrData={qrData} />
      <ConnectedFriends navigation={navigation} />
      <LineAcross text='OR' />
      <TableLink />
      <CustomButton navigation={navigation} title='Go to Table' screen='TableStatus' />
    </ScrollView>
  );
}