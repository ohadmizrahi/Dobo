import { View, Text } from 'react-native';
   

export default function FormHeadLine({ data }) {
  return (
    <View style={styles.formHeadLine}>
        <Text style={styles.formHeadLineText}>{data}</Text>
    </View>
  );
};

const styles = {
  formHeadLine: {
    width: 300,
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#97DECC',
    borderRadius: 50,
    marginTop: 130,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  formHeadLineText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',

  },
  shadowBottom: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
},
};
