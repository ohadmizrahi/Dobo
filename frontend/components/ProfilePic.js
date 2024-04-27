import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const ProfilePicture = ({ name, imageurl }) => {
  const [image, setImage] = useState(imageurl);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={globalStyles.profilePictureContainer}>
      <View style={globalStyles.iconContainer}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        ) : (
          <Icon name="camera" size={50} color="white" />
        )}
        <TouchableOpacity onPress={selectImage} style={globalStyles.plusIcon}>
          <Icon name="plus-circle" size={40} color="black"  />
        </TouchableOpacity>
      </View>
      <Text style={globalStyles.nameText}>Hi {name || 'Guest'}</Text>
      <Text style={globalStyles.setupText}>Set up your account</Text>
    </View>
  );
};

export default ProfilePicture;