// google and facebook sing in section ( sign in & sign up screens)
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '@Root/globalStyles'

const TableLink = () => (
  <>
  <TouchableOpacity onPress={() => {
    Alert.alert('Table Link Button', 'This functionality is not part of the POC');
  }}>
  <View style={globalStyles.socialSignInContainer}>
    <Icon name="whatsapp" size={24}/>
    <Text style={{padding: 10, adjustsFontSizeToFit: true, fontSize: 18}}>Copy Table Invitation Link</Text>
  </View>
  </TouchableOpacity>
  </>
);

// socialSignInContainer: {
//   flex: 1,
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   alignSelf: 'center',
//   margin: 5,
//   backgroundColor: '#FFFFFF',
//   borderRadius: 100,
//   width: '90%',
//   height: 40,
// },
export default TableLink;
