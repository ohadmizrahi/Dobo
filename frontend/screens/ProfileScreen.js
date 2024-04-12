import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import MoveScreenBtn from '../components/MoveScreenBtn';
import { globalStyles } from '../globalStyles';
import ProfilePicture from '../components/ProfilePic';
import DoboLogo from '../components/DoboLogo';
import AccountInfoForm from '../components/AccountInfoForm';
import PasswordForm from '../components/PasswordForm';
import PaymentDetails from '../components/PaymentDetails';

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screenColor}>
      <DoboLogo />
      <ProfilePicture />
      <AccountInfoForm />
      <PasswordForm />
      <PaymentDetails />
      <MoveScreenBtn navigation={navigation} screen={'SignIn'} title={'Log out'} backgroundColor={'red'}/>
    </ScrollView>
  );
}