// bussines name and picture 
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const BusinessHeader = ({ BusinessHeader  }) => {
    const {businessname, imageUrl} = BusinessHeader 
  return (
    <View style={styles.BusinessHeadercontainer}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
      <Text style={[styles.head, styles.text]}>{businessname}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    BusinessHeadercontainer: {
    flex: 0.5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Adjusts image to fit container
    width: '100%',
  },
  head: {
    width: 200,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#97DECC',
    marginTop: '10%',
    borderRadius: 50,
  },
  text: {
    position: 'absolute',
    padding: 10,
    fontSize: 24,
    borderRadius: 50,
    marginBottom: 10,
    textAlign: 'center',
  },

});

export default BusinessHeader;
