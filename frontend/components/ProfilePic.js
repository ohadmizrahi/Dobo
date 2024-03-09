// profile name and picture 
import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Directions } from 'react-native-gesture-handler';

const ProfilePicture = ({ name }) => (
  <View style={globalStyles.profilePictureContainer}>
      <Icon name="camera" style={globalStyles.icons}/>
      <Text>Hi</Text>
  </View>
);

export default ProfilePicture;