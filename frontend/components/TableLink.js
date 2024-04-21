// google and facebook sing in section ( sign in & sign up screens)
import React from 'react';
import { View,Button } from 'react-native';
import { globalStyles } from '@Root/globalStyles'
import Icon from 'react-native-vector-icons/FontAwesome';
const TableLink = () => (
  <>
  <View style={globalStyles.socialSignInContainer}>
    <Icon name="whatsapp" size={24}/>
    <Button title="Send Table Link via WhatsApp"
      onPress={() => {console.log('Send Table Link')}}
    />
  </View>
  </>
);
export default TableLink;
