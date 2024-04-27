// logo image 
import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { globalStyles } from '@Root/globalStyles';

const logoImg = require('@Assets/logo.png');

const LogoImage = () => {
    return (
        <SafeAreaView>
            <Image source={logoImg} style={globalStyles.image} />
        </SafeAreaView>
    );
};
export default LogoImage;