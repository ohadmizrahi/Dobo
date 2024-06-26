import {ScrollView , KeyboardAvoidingView, Platform, StatusBar} from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import {
  SocialSignIn,
  DoboLogo,
  ProfilePicture,
  DontHaveAccount,
  SigninForm,
  LineAcross
} from '@Components';

export default function SignInScreen({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
    <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      <ProfilePicture />
      <SigninForm />
      <DontHaveAccount navigation={navigation}/>
      <LineAcross text='OR' />
      <SocialSignIn />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}