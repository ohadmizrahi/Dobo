// google and facebook sing in section ( sign in & sign up screens)
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles'

const SocialSignInButton = ({ provider, onPress }) => (
  <TouchableOpacity style={globalStyles.buttonSocial} onPress={() => onPress(provider)}>
    <Text style={globalStyles.buttonText}>{`Sign in with ${provider}`}</Text>
  </TouchableOpacity>
);

const SocialSignIn = () => {
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <View>
      <SocialSignInButton provider="facebook" onPress={handleSocialLogin} />
      <SocialSignInButton provider="google" onPress={handleSocialLogin} />
    </View>
  );
};

export default SocialSignIn;
