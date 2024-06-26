import { View, Text } from 'react-native';
import { globalStyles } from '@Root/globalStyles';

export default function LineAcross({ text, color }) {
  return (
    <View style={globalStyles.divider}>
      <View style={globalStyles.line} />
      <Text style={globalStyles.lineText}>{text}</Text>
      <View style={globalStyles.line} />
    </View>
  );
}