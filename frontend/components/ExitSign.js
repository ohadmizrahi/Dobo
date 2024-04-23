import React from "react";
import { View, TouchableOpacity , StyleSheet } from "react-native";
import { globalStyles } from "@Root/globalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native'; 

export default function ExitSign() {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, globalStyles.exitSignContainer]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="times-circle-o" size={35} color="grey" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
  },
});
