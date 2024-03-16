import React from 'react';
import { View, Text, Button } from 'react-native';
import SocialSignIn from '../components/SocialSignIn';
import LogoImage from '../components/DoboLogo';
import ProfilePicture from  '../components/ProfilePic';
import FormHeadLine from '../components/FormHeadLine';
import { globalStyles } from '../globalStyles';
import DontHaveAccount from '../components/NewAccount';
import SigninForm from '../components/SigninForm';

export default function SignInScreen({ navigation }) {
  return (
    <View style= {globalStyles.screenColor}>
      <LogoImage />
      <ProfilePicture />
      <FormHeadLine formName='Sign In' />
      <DontHaveAccount navigation={navigation}/>
       <SocialSignIn />
      <SigninForm />
    </View>
  );
}