import React from 'react';
import {ScrollView , KeyboardAvoidingView, Platform} from 'react-native';
import SocialSignIn from '@Components/SocialSignIn';
import LogoImage from '@Components/DoboLogo';
import ProfilePicture from  '@Components/ProfilePic';
import { globalStyles } from '@Root/globalStyles';
import DontHaveAccount from '@Components/NewAccount';
import SigninForm from '@Components/SigninForm';
import LineAcross from '@Components/LineAcross';

export default function SignInScreen({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} style={globalStyles.screenColor}>
    <ScrollView>
      <LogoImage />
      <ProfilePicture />
      <SigninForm />
      <DontHaveAccount navigation={navigation}/>
      <LineAcross text='OR' />
      <SocialSignIn />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}