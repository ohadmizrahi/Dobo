import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfilePicture = ({ name }) => (
  <View style={globalStyles.profilePictureContainer}>
    <View style={globalStyles.iconContainer}>
      <Icon name="camera" size={50} color="white" />
      <Icon name="plus-circle" size={40} color="black" style={globalStyles.plusIcon} />
      </View>
    <Text style={globalStyles.nameText}>Hi {name || 'Guest'}</Text>
    <Text style={globalStyles.setupText}>Set up your account</Text>
  </View>
);

export default ProfilePicture;
