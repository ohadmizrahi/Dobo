import React from "react";
import { View, TouchableOpacity , StyleSheet } from "react-native";
import { globalStyles } from "@Root/globalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native'; 

export default function ExitSign() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="times-circle-o" size={30} color="grey" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    alignItems: 'flex-end',
  },
});
