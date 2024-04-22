import React from 'react';
import { View, Text, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';

const LoadingIcon = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#97DECC" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0,
  },
});

export default LoadingIcon;
