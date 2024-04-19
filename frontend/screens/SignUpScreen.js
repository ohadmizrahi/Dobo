import React from 'react';
import { ScrollView , KeyboardAvoidingView, Platform} from 'react-native';
import SocialSignIn from '@Components/SocialSignIn';
import LogoImage from '@Components/DoboLogo';
import ProfilePicture from  '@Components/ProfilePic';
import SignUpForm from '@Components/SignupForm';
import { globalStyles } from '@Root/globalStyles';

export default function SignUpScreen({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
      <ScrollView>
      <LogoImage />
      <ProfilePicture />
      <SignUpForm />
      <SocialSignIn />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}