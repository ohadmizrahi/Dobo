import { ScrollView , KeyboardAvoidingView, Platform , StatusBar} from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import {
  SocialSignIn,
  DoboLogo,
  ProfilePicture,
  SignUpForm
} from '@Components';

export default function SignUpScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
      <StatusBar barStyle="light-content" />
      <DoboLogo />
      <ProfilePicture />
      <SignUpForm />
      <SocialSignIn />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}