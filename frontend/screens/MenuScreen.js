import { View, StatusBar, StyleSheet } from 'react-native';
import Menu from '@Components/Menu';
import ExitSign from '@Components/ExitSign';
import HeaderImage from '@Components/HeaderImage';
import FormHeadLine from '@Components/FormHeadLine';

export default function MenuScreen({ route }) {
  const { menu = [], imageurl = '', name='' } = route.params || {};

  return (
    <View style = {styles.container}>
      <StatusBar barStyle="light-content" />
      <ExitSign/>
      <HeaderImage data={imageurl} />
      <FormHeadLine data={name} />
      <Menu isOrderScreen={false} data={{ menu }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },});