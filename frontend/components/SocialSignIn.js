// google and facebook sing in section ( sign in & sign up screens)
import React from 'react';
import { View, Text,Button } from 'react-native';
import { globalStyles } from '@Root/globalStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
const SocialSignIn = () => (
  <>
  <View style={globalStyles.socialSignInContainer}>
    <Icon name="google" size={24}/>
    <Button title="Continue with Google"
      onPress={() => {console.log('google test')}}
    />
  </View>
  <View style={globalStyles.socialSignInContainer}>
    <Icon name="facebook" size={24}/>
    <Button
      title="Continue with Facebook" Style={globalStyles.SocialSignIn} titleStyle={globalStyles.socialtext}
      onPress={() => {console.log('facebook test')}}
    />
  </View>
  </>
);
export default SocialSignIn;
