import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const YourAccountButton = ({ balance, handlePress }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
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
