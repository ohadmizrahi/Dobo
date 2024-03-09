import { globalStyles } from '../globalStyles';
import React from 'react';
import { View, Text } from 'react-native';

export default function FormHeadLine({ formName }) {
  return (
    <View style={[globalStyles.formHeadLine, globalStyles.shadowBottom]}>
        <Text style={globalStyles.formHeadLineText}>{formName}</Text>
    </View>
  );
};