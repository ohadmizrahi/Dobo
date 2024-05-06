import { View, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { globalStyles } from '@Root/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getData } from '@Utils/storage/asyncStorage';

export default function ProfileLogo() {
  const navigation = useNavigation();

  async function handlePress() {
    const userToken = await getData('userToken');
    userToken ?
    navigation.navigate('Profile') :
    (() => {
      Alert.alert(
      'You are not signed in',
      'Do you want to sign in?',
      [
        {text: 'Yes', onPress: () => navigation.navigate('SignIn')},
        {text: 'No'}],{cancelable: true});
    })();
  }

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Icon name="user-circle-o" style={[globalStyles.headerIconRight, globalStyles.icons]} />
      </Pressable>
    </View>
  );
}
