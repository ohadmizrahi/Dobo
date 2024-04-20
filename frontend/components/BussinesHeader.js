// bussines name and picture 
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';


const BussinesHeader = () => {

    const businessCardData ={
      businessname: 'Coffie House',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_960_720.jpg'
    };


  return (
    <View style={styles.BusinessCardcontainer}>
      <Image source={{ uri: businessCardData.imageUrl }} style={styles.backgroundImage} />
      <View style={styles.head}>
      <Text style={styles.text}>{businessCardData.businessname}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BusinessCardcontainer: {
  flex: 0.5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  head: {
    width: 300,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97DECC',
    borderRadius: 50,
    marginTop: 130,
    position: 'absolute',


  },
  text: {
    position: 'absolute',
    padding: 10,
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },

});

export default BussinesHeader;
