import React from 'react';
import { SafeAreaView, Text, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';

const LoadingIcon = () => {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#97DECC" />
      <Text>Loading...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0, // Ensure StatusBar.currentHeight is defined
  },
});

export default LoadingIcon;
