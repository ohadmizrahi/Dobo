// bussines name and picture 
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const BusinessCard = ({ businessCard  }) => {
    const {businessname,imageUrl} = businessCard 
  return (
    <View style={styles.BusinessCardcontainer}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
      <Text style={[styles.head, styles.text]}>{businessname}</Text>
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
  head: {
    width: 220,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#97DECC',
    marginTop: '10%',
    borderRadius: 50,
  },
  text: {
    position: 'absolute',
    padding: 10,
    fontSize: 30,
    borderRadius: 50,
    marginBottom: 10,
    textAlign: 'center',
  },

});

export default BusinessCard;
