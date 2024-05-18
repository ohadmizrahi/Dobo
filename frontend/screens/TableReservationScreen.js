import { ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import {
  TableReservationForm,
  ExitSign,
  HeaderImage,
  FormHeadLine
} from '@Components';



export default function TableReservationScreen({ route }) {
  const { businessId = '', imageurl = '', name = '' } = route.params || {};


  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={{ flex: 1 }}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <ExitSign />
        <HeaderImage data={imageurl} />
        <FormHeadLine data={name} />
        <TableReservationForm data={businessId}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
