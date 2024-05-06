import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyles } from '@Root/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData, storeData } from '@Utils/storage/asyncStorage';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

const ProfilePicture = ({ name, imageurl, handleUpdateProfile }) => {
  const [image, setImage] = useState(imageurl);

  useEffect(() => {
    setImage(imageurl)
  }, [imageurl]);

  const selectImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      const imageUrl = result.assets[0].uri;
      
      const account = await getData('account');
      await storeData('account', {...JSON.parse(account), imageurl: imageUrl});
      const account2 = await getData('account');
      console.log('account2', account2);

      handleUpdateProfile((prevProfile) => ({ ...prevProfile, account: {...prevProfile.account, imageurl: imageUrl } }));
      
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      const storedImage = await getData('profilePicture');
      if (storedImage) {
        setImage(storedImage);
      }
    };
  
    fetchImage();
  }, []);

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