import { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Button,StatusBar, View} from 'react-native';
import { CameraView, Camera } from "expo-camera";
import { globalStyles } from '@Root/globalStyles';
import { DoboLogo, ExitSign } from '@Components';


export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigation.navigate('JoinTable', { qrData: data });

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }



  return (
    <SafeAreaView style={globalStyles.screenColor}>
      <StatusBar barStyle="light-content" />
      <ExitSign />
      <DoboLogo />
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>
      <View style={styles.cameraView}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.square}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      />
      </View>
      
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
  },
  cameraView: {
    width: 350,
    maxHeight: 350,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#97DECC',
  },
  square: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#EFEFEF',
  },
});