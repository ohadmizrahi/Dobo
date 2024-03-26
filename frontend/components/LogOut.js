// Logout btn for profile screen
import React from 'react';
import { Button, Text, View } from 'react-native';
import { globalStyles } from '../globalStyles';

export default function LogoutButton ({ navigation }){
  return (
    <View style={globalStyles.Logoutcontainer}>
      <Button title="Logout" color= "#FFFFFF" 
        onPress={() => { navigation.navigate('SignIn')}} />
    </View>
  );
};

// take the color to the container style