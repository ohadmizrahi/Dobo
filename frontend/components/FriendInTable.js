import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {storeData} from '@Utils/storage/asyncStorage';
import FormContainer from '@Components/FormContainer';

const friendsData = [
    {
        id: '1',
        name: 'John Doe',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        paid: 30,
        totalToPay: 50,
    },
    {
        id: '2',
        name: 'Alice Smith',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        paid: 20,
        totalToPay: 50,
    },
    {
        id: '3',
        name: 'Moshe Smith',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        paid: 60,
        totalToPay: 100,
    },
];

const FriendsInTable = ({ totalFriends }) => {
    const [joinedFriends, setJoinedFriends] = useState(0);
    // Question to Bar: why do we need this?
    useEffect(() => {
        if (joinedFriends === totalFriends) {
            console.log('All friends have joined the table');
        }
    }, [joinedFriends, totalFriends]);

    // Function to handle when a friend joins the table
    const handleFriendJoin = () => {
        setJoinedFriends(prevJoinedFriends => prevJoinedFriends + 1);
    };

    useEffect(() => {
        if (joinedFriends < totalFriends) {
            handleFriendJoin();
        }
    }, []);

    const FriendsData = friendsData;
    storeData('FriendsData', FriendsData)

    const totalPaid = friendsData.reduce((total, friend) => total + friend.paid, 0);
const totalToPay = friendsData.reduce((total, friend) => total + friend.totalToPay, 0);

    return (
        <FormContainer formName='Friends'>

                {friendsData.map(friend => (
                    <View key={friend.id} style={styles.friendItem}>
                        <Image source={{ uri: friend.image }} style={styles.friendImage} />
                        <View style={styles.friendDetails}>
                            <Text style={styles.friendName}>{friend.name}</Text>
                            <Text style={styles.friendAmount}> {friend.paid}$</Text>
                            <Text style={styles.friendAmount}> {friend.totalToPay}$</Text>
                        </View>
                    </View>
                ))}
                <View style={styles.columnNames}>
                    <Text style={styles.columnText}>Payed:</Text>
                    <Text style={styles.columnText}>Out of:</Text>
                    <Text style={styles.columnText}>Left:</Text>
                </View>
                <View style={styles.columnNames}>
                    <Text style={styles.columnText}>{totalPaid}$</Text>
                    <Text style={styles.columnText}>{totalToPay}$</Text>
                    <Text style={styles.columnText}>{totalToPay - totalPaid}$</Text>
                </View>
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
    },
    friendImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    friendDetails: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    friendName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',

    },
    friendAmount: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
    },
    columnNames: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    columnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
        margin: 5,
    },
});

export default FriendsInTable;
