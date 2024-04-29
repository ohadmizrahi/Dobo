import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const YourAccountButton = ({ balance, handlePress }) => {

    function pay() {
        Alert.alert(
            'Confirm Checkout',
            'Are you sure you want to checkout?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Confirm',
                onPress: () => handlePress(),
              },
            ],
            { cancelable: false }
          );
    }

    return (
        <TouchableOpacity style={styles.button} onPress={pay}>
            <Text style={styles.buttonText}>Your Account</Text>
            <Text style={styles.totalText}>Total: ${balance}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#97DECC',
        borderRadius: 50,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#000',
    },
    totalText: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
});

export default YourAccountButton;
