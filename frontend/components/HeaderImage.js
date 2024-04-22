import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { BASE_URL, BE_PORT } from '@env';


const HeaderImage = ({ data }) => {
  const image = `${BASE_URL}:${BE_PORT}/assets/${data}`;
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          const value = data ? await AsyncStorage.getItem(data) : 'https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg';
          if(value !== null) {
            setImage(value);
          }
        } catch(e) {
          console.log(e);
        }
      }
  
      fetchImage();
    }, []);
    return (
      <Image
        style={{ width: '100%', height: 250 , marginBottom: 20}}
        source={{ uri: image }}
      />
    );
  }


  
export default HeaderImage;