// google and facebook sing in section ( sign in & sign up screens)
import React from 'react';
import { View, Text,Button } from 'react-native';
import { globalStyles } from '../globalStyles'

const SocialSignIn = () => (
  <>
    <Button title="Continue with Google" Style={globalStyles.SocialSignIn} titleStyle={globalStyles.socialtext}
      onPress={() => {console.log('google test')}}
    />
    <Button
      title="Continue with Facebook" Style={globalStyles.SocialSignIn} titleStyle={globalStyles.socialtext}
      onPress={() => {console.log('facebook test')}}
    />
  </>
);
export default SocialSignIn;
