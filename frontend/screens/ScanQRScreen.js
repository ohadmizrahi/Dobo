import { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Button,StatusBar, View} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { globalStyles } from '@Root/globalStyles';
import DoboLogo from '@Components/DoboLogo';
import CustomButton from '@Components/CustomButton';


export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
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
      <DoboLogo />
      <Text style={styles.title}>Scan QR Code</Text>
      <View style={styles.cameraView}>
      <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={styles.square}
      />
      </View>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      <View style={{marginTop: 200}} />
      <CustomButton title="Back To Home" handlePress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cameraView: {
    width: 350,
    maxHeight: 350,
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 20,
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
    marginTop: 20,
  },
});