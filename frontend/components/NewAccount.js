// create account btn
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';

const DontHaveAccount = ({ navigation }) => (
  <View style={styles.container}>
  <View style={{padding: 8, flexDirection: 'row'}}>
    <Text style={styles.text}>Don't have an account? </Text>
    <TouchableOpacity onPress={() => { navigation.navigate('SignUp')}}>
      <Text style={styles.link}>Click here to create</Text>
    </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#97DECC",
    alignSelf: 'center',
    borderRadius: 50,
    width: '85%',
    height: '100%',
    margin: 20,

   },
  text: {
    fontSize: 16,
  },
  link: {
    color: '#0000EE',
    fontWeight: 'bold',
  },
});

export default DontHaveAccount;
