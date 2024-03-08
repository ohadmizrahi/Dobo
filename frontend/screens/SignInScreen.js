import React from 'react';
import { View, Text, Button } from 'react-native';
import SocialSignIn from '../components/SocialSignIn';
import LogoImage from '../components/DoboLogo';


export default function SignInScreen({ navigation }) {
  return (
    <View>
      <Text>SignIn</Text>
      <LogoImage />
      <SocialSignIn />
    </View>
  );
}