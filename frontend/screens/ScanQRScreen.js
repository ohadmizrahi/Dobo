import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

const ScanQRScreen = () => {
  const [scannedData, setScannedData] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    try {
      const parsedData = JSON.parse(data);
      const { businessId, tableId } = parsedData;
      console.log(`Business ID: ${businessId}, Table ID: ${tableId}`);
      // You can set these to state or do something else with them here
    } catch (error) {
      console.error('Failed to parse QR code data:', error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        autoFocus={Camera.Constants.AutoFocus.on}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
      />
      {/* Corner frames */}
      <View style={styles.cornerFrameTopLeft} />
      <View style={styles.cornerFrameTopRight} />
      <View style={styles.cornerFrameBottomLeft} />
      <View style={styles.cornerFrameBottomRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    aspectRatio: 1,
    width: '70%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cornerFrameTopLeft: {
    position: 'absolute',
    top: 280,
    left: 80,
    width: 40,
    height: 40,
    borderColor: '#97DECC',
    borderLeftWidth: 5,
    borderTopWidth: 5,
  },
  cornerFrameTopRight: {
    position: 'absolute',
    top: 280,
    right: 80,
    width: 40,
    height: 40,
    borderColor: '#97DECC',
    borderRightWidth: 5,
    borderTopWidth: 5,
  },
  cornerFrameBottomLeft: {
    position: 'absolute',
    bottom: 280,
    left: 80,
    width: 40,
    height: 40,
    borderColor: '#97DECC',
    borderLeftWidth: 5,
    borderBottomWidth: 5,
  },
  cornerFrameBottomRight: {
    position: 'absolute',
    bottom: 280,
    right: 80,
    width: 40,
    height: 40,
    borderColor: '#97DECC',
    borderRightWidth: 5,
    borderBottomWidth: 5,
  },

});

export default ScanQRScreen;
