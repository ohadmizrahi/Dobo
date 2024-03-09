// profile name and picture 
import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../globalStyles';

const ProfilePicture = ({ name }) => (
  <View style={globalStyles.profilePictureContainer}>
    {name ? (
      <Text style={globalStyles.profilePictureText}>{name.charAt(0).toUpperCase()}</Text>
    ) : (
      <Image source={require('../assets/no picture default.png')} style={globalStyles.profilePictureImage} />
    )}
  </View>
);

export default ProfilePicture;