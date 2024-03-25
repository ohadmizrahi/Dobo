import React from 'react';
import { View, Text, Button } from 'react-native';
import LogoutButton from '../components/LogOut';
import { globalStyles } from '../globalStyles';
import SignUpForm from '../components/SignupForm';
import PaymentForm from '../components/PaymentForm';
import { ScrollView } from 'react-native-gesture-handler';


export default function ProfileScreen({ navigation }) {
  return (
    <View style={globalStyles.screenColor}>
      <ScrollView>
      <Text>Profile</Text>
      <SignUpForm />
      <PaymentForm />
      {/* reset password button */}
      <LogoutButton navigation={navigation} />
      </ScrollView>
    </View>
  );
}