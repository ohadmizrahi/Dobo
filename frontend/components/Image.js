import React from 'react';
import { View, Image } from 'react-native';
import { globalStyles } from '../globalStyles';

const logoImg = require('../assets/logo.png');
const profileImg = require('../assets/profile.png');

export const Image = () => {
    return (
        <View>
            <Image source={profileImg} />
            <Image source={logoImg} style={globalStyles.image} />
        </View>
    );
};
