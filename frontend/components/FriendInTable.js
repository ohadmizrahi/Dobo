import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {storeData} from '@Utils/storage/asyncStorage';
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

    const FriendsData = JSON.stringify(friendsData);
    storeData('FriendsData',FriendsData)

    return (
        <View style={styles.container}>
            <Text style={[styles.header, styles.headerText]}>Friends</Text>
            <View style={styles.friendsContainer}>
                {friendsData.map(friend => (
                    <View key={friend.id} style={styles.friendItem}>
                        <Image source={{ uri: friend.image }} style={styles.friendImage} />
                        <View style={styles.friendDetails}>
                            <Text style={styles.friendName}>{friend.name}</Text>
                            <Text style={styles.friendAmount}> ${friend.paid}</Text>
                            <Text style={styles.friendAmount}> ${friend.totalToPay}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25,
    },
    header: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#97DECC',
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
    },
    friendsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginVertical: 10,
        padding: 20,
        width: '100%',
        position: 'relative',
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 10,
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
    },
});

export default FriendsInTable;
