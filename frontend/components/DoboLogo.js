// logo image 
import React from 'react';
import { Image } from 'react-native';
import { globalStyles } from '@Root/globalStyles';

const logoImg = require('@Assets/logo.png');

const LogoImage = () => {
    return (
        <Image source={logoImg} style={globalStyles.image} />
    );
};
export default LogoImage;