import React from 'react';
import { View, Text, Button } from 'react-native';
import SocialSignIn from '../components/SocialSignIn';
import LogoImage from '../components/DoboLogo';
import ProfilePicture from  '../components/ProfilePic';
import SignUpForm from '../components/SignupForm';
import { globalStyles } from '../globalStyles';

export default function SignUpScreen({ navigation }) {
  return (
    <View style={globalStyles.screenColor}>
      <Text>SignUp</Text>
      <LogoImage />
      <ProfilePicture />
      <SignUpForm />
      <SocialSignIn />
    </View>
  );
}