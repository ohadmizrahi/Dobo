import React from 'react';
import { View, Text, Button } from 'react-native';
import HomeLogo from '../components/HomeLogo';
import ProfileLogo from '../components/ProfileLogo';
import {globalStyles} from '../globalStyles';
import Bell from '../components/Bell';
import SignUp from '../components/SignupForm';


export default function ItamScreen({navigation}) {   
  return (
    <View style={globalStyles.screenColor} >
      <HomeLogo navigation={navigation} />
      <ProfileLogo navigation={navigation}/>
      <Bell navigation={navigation}/>
      <SignUp />
    </View>
  );
}