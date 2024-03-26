import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ConnectedFriends({ navigation }) {
    const friends = [
        {
            name: 'John Doe',
            phoneNumber: '123-456-7890',
        },
        {
            name: 'Jane Doe',
            phoneNumber: '098-765-4321',
        },
        {
            name: 'Alice Smith',
            phoneNumber: '111-222-3333',
        },
        {
            name: 'Bob Johnson',
            phoneNumber: '444-555-6666',
        },
        {
            name: 'Emily Brown',
            phoneNumber: '777-888-9999',
        },
        {
            name: 'Michael Wilson',
            phoneNumber: '101-202-3030',
        },
        {
            name: 'Emma Taylor',
            phoneNumber: '404-505-6060',
        },
        {
            name: 'David Martinez',
            phoneNumber: '707-808-9090',
        },
        {
            name: 'Olivia Lopez',
            phoneNumber: '121-212-2323',
        },
        {
            name: 'James Anderson',
            phoneNumber: '545-646-7474',
        },
    ];
    
    return (
        <View style={styles.container}>
        <View style={[styles.formHeadLine,styles.shadowBottom]}>
          <Text style={styles.formHeadLineText}>Connected Friends</Text>
        </View>
            <Text style={styles.textStyles}>Invite via Phone Number</Text>

            {friends.map((friend, index) => (
                <View style={styles.friendContainer} key={index}>
                    <Icon name='group' size={20} />
                    <Text> Friend {index + 1} {friend.name}</Text>
                </View>
            ))}
            <TouchableOpacity>
                <View style={styles.plusButton}>
                    <Icon name='plus' size={20} color={'white'} />
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        borderRadius: 70,
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 20,
        
    },
    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: 200, // Add a fixed width for the container holding the icons
    },
    textStyles: {
        fontSize: 20,
        padding: 10,
    },
    formHeadLine: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#97DECC',
        borderRadius: 50,
        marginTop: -40,
        alignItems: 'center',
        justifyContent: 'center',
    
      },
      formHeadLineText: {
        fontSize: 20,
        color: '#000',
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
    },
});
