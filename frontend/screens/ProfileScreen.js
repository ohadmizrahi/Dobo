import React from 'react';
import { View,ScrollView, Text, Button } from 'react-native';
import LogoutButton from '../components/LogOut';
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
      <LogoutButton navigation={navigation} />
    </ScrollView>
  );
}