// bussines name and picture 
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../globalStyles';

const BusinessCard = ({ businessCard  }) => {
    const {businessName,imageUrl} = businessCard 
  return (
    <View style={styles.BusinessCardcontainer}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
      <Text style={[globalStyles.formHeadLine, globalStyles.formHeadLineText]}>{businessName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    BusinessCardcontainer: {
    flex: 0.5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjusts image to fit container
    width: '100%',
  },
});

export default BusinessCard;
