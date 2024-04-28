import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '@Components/FormContainer';

export default function ConnectedFriends() {
    const friends = [
        {
            name: 'John Doe',
            phoneNumber: '123-456-7890',
        },
        {
            name: 'Jane Doe',
            phoneNumber: '098-765-4321',
        },
    ];

    return (
        <FormContainer formName='Connected Friends'>
            <Text style={styles.textStyles}> Invite via phone Number </Text>
            {friends.map((friend, index) => (
                <View style={styles.friendContainer} key={index}>
                    <Icon name='group' size={20} />
                    <Text > Friend {index + 1} {friend.name}</Text>
                </View>
            ))}
            <TouchableOpacity>
                <View style={styles.plusButton}>
                    <Icon name='plus' size={20} color={'white'} />
                </View>
            </TouchableOpacity>
        </FormContainer>
    );
}

const styles = StyleSheet.create({
    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,

    },
    textStyles: {
        fontSize: 16,
        padding: 10,
        alignSelf: 'center',
    },
      shadowBottom: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    plusButton: {
        backgroundColor: '#1D2328',
        borderRadius: 50,
        width: 100,
        height: 30,
        alignSelf: 'center',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
});
