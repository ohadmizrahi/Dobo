// logo image 
import React from 'react';
import { View, Image } from 'react-native';
import {globalStyles} from '../globalStyles';

export default function DoboLogo () {
    return (
        <View style={globalStyles.image}>
            <Image source={require('../assets/logo.png')} />
        </View>
    );
}