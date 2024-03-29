import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import SocialSignIn from '../components/SocialSignIn';
import LogoImage from '../components/DoboLogo';
import ProfilePicture from  '../components/ProfilePic';
import SignUpForm from '../components/SignupForm';
import { globalStyles } from '../globalStyles';

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