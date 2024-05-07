import { View, Text, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';

const LoadingIcon = ({backgroundColor}) => {
  return (
    <View style={[styles.loadingContainer, { backgroundColor: backgroundColor }]}>
      <ActivityIndicator size="large" color="#97DECC" />
      <Text style={{color: 'white'}}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#3D3D3D'
  },
});

export default LoadingIcon;
