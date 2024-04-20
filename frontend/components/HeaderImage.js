import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';


const HeaderImage = ({ imageUrl }) => {
    const [image, setImage] = useState(null);
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          const value = imageUrl ? await AsyncStorage.getItem(imageUrl) : 'https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg';
          if(value !== null) {
            setImage(value);
          }
        } catch(e) {
          console.log(e);
        }
      }
  
      fetchImage();
    }, [imageUrl]);
  
    return (
      <Image
        style={{ width: '100%', height: 250 , marginBottom: 20}}
        source={{ uri: image }}
      />
    );
  }


  
export default HeaderImage;