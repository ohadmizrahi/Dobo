import React from 'react';
import {ScrollView } from 'react-native';
import SocialSignIn from '../components/SocialSignIn';
import LogoImage from '../components/DoboLogo';
import ProfilePicture from  '../components/ProfilePic';
import { globalStyles } from '../globalStyles';
import DontHaveAccount from '../components/NewAccount';
import SigninForm from '../components/SigninForm';
import LineAcross from '../components/LineAcross';

export default function SignInScreen({ navigation }) {
  return (
    <ScrollView style= {globalStyles.screenColor}>
      <LogoImage />
      <ProfilePicture />
      <SigninForm />
      <DontHaveAccount navigation={navigation}/>
      <LineAcross text='OR' />
      <SocialSignIn />
    </ScrollView>
  );
}