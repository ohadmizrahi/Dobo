import React from 'react';
import { Image } from 'react-native';
import { globalStyles } from '../globalStyles';

const logoImg = require('../assets/logo.png');

export const LogoImage = () => {
    return (
        <Image source={logoImg} style={globalStyles.image} />
    );
};

