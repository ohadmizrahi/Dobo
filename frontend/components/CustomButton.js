import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CustomButton = ({ handlePress, title, children, buttonStyle }) => {

  return (
    <TouchableOpacity style={[styles.defaultButtonStyle, buttonStyle]} onPress={handlePress}>
      <View style={{flexDirection: 'row'}}>
      <Text 
        style={[styles.text, buttonStyle && buttonStyle.textColor && {color: buttonStyle.textColor}]}
      >
        {title}
      </Text>
      {children && 
      <Text 
        style={[styles.text, buttonStyle && buttonStyle.textColor && {color: buttonStyle.textColor}]}>
        {children}
      </Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
    padding: 5,
  },
  defaultButtonStyle: {
    backgroundColor: '#1D2328',
    marginTop: 5,
    width: '70%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CustomButton;
