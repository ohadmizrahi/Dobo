// google and facebook sing in section ( sign in & sign up screens)
import { View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '@Root/globalStyles'

const SocialSignIn = () => (
  <>
  <View style={globalStyles.socialSignInContainer}>
    <Icon name="google" size={24}/>
    <Button title="Continue with Google"
      onPress={() => {console.log('google test')}}
    />
  </View>
  <View style={globalStyles.socialSignInContainer}>
    <Icon name="facebook" size={24}/>
    <Button
      title="Continue with Facebook" Style={globalStyles.SocialSignIn} titleStyle={globalStyles.socialtext}
      onPress={() => {console.log('facebook test')}}
    />
  </View>
  </>
);
export default SocialSignIn;
