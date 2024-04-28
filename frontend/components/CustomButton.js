import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ handlePress, title, backgroundColor, children, buttonStyle }) => {
  const defaultButtonStyle = {
    backgroundColor: backgroundColor || '#1D2328', // Use the provided backgroundColor or the default value
    marginTop: 5,
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
  };

  return (
    <TouchableOpacity style={[defaultButtonStyle, buttonStyle]} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default CustomButton;
