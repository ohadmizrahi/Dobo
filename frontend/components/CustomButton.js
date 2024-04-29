import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ handlePress, title, backgroundColor, textColor }) => {
  const buttonStyle = {
    ...styles.button,
    backgroundColor: backgroundColor || styles.button.backgroundColor,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={handlePress}>
      <Text style={[styles.text, textColor && {color: textColor} ]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1D2328',
    marginTop: 15,
    marginBottom: 40,
    width: '80%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
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
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default CustomButton;
