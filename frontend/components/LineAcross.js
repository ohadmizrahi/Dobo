import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../globalStyles';

export default function LineAcross({ text }) {
  return (
    <View style={globalStyles.divider}>
      <View style={globalStyles.line} />
      <Text style={globalStyles.lineText}>{text}</Text>
      <View style={globalStyles.line} />
    </View>
  );
}