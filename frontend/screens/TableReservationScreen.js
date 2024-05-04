import { ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import {
  TableReservationForm,
  BusinessHeader,
  ExitSign,
  HeaderImage,
  CustomButton,
  FormHeadLine
} from '@Components';

export default function TableReservationScreen({ navigation, route}) {
  const { businessId = '', imageurl = '' ,name=''} = route.params || {};

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{flex : 1}}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <ExitSign/>
        <HeaderImage data={imageurl} />
        <FormHeadLine data={name} />
        <BusinessHeader />
        <TableReservationForm data={businessId}/>
        <CustomButton title="Back To Home" handlePress={() => navigation.navigate('Home')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
