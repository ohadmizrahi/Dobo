import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import SocialSignIn from '@Components/SocialSignIn';
import LogoImage from '@Components/DoboLogo';
import ProfilePicture from  '@Components/ProfilePic';
import SignUpForm from '@Components/SignupForm';
import { globalStyles } from '@Root/globalStyles';

export default function SignUpScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <LogoImage />
      <ProfilePicture />
      <SignUpForm />
      <SocialSignIn />
    </ScrollView>
  );
}