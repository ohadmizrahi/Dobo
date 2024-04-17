import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import MoveScreenBtn from '@Components/MoveScreenBtn';
import { globalStyles } from '@Root/globalStyles';
import ProfilePicture from '@Components/ProfilePic';
import DoboLogo from '@Components/DoboLogo';
import AccountInfoForm from '@Components/AccountInfoForm';
import PasswordForm from '@Components/PasswordForm';
import PaymentDetails from '@Components/PaymentDetails';

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