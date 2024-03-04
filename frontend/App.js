import {View, Image, StatusBar} from 'react-native';
import { globalStyles } from './globalStyles';
import React from 'react';

const logoImg = require('./assets/logo.png');

export default function App() { 
  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="light-content" />  
        <Image source={logoImg} style={globalStyles.image} />


       </View>
  );
  }

