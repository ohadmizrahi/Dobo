import React from 'react';
import { View, Text, Button } from 'react-native';
import SocialSignIn from '../components/SocialSignIn';
import LogoImage from '../components/DoboLogo';

export default function SignUpScreen({ navigation }) {
  return (
    <View>
      <Text>SignUp</Text>
      <LogoImage />
      <SocialSignIn />
    </View>
  );
}