import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { globalStyles } from '@Root/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileLogo() {
  const navigation = useNavigation(); 

  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Icon name="user-circle-o" style={[globalStyles.headerIconRight, globalStyles.icons]} />
      </Pressable>
    </View>
  );
}
