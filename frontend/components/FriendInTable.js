import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { storeData, getData } from '@Utils/storage/asyncStorage';
import FormContainer from '@Components/FormContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

const FriendsInTable = ({ friends, totalFriends }) => {
    const [myself, setMyself] = useState(null);

    useEffect(() => {
        getData('client').then(client => {
            setMyself(JSON.parse(client).clientId);
        });
    }, []);

    storeData('FriendsData', friends)

    const totalPaid = friends.reduce((total, friend) => parseFloat(total) + parseFloat(friend.paid), 0);
    const totalToPay = friends.reduce((total, friend) => parseFloat(total) + parseFloat(friend.total), 0);
    
    function renderFriendImage(friend) {
        if (friend.clientimage) {
            return <Image source={{ uri: friend.clientimage }} style={styles.friendImage} />;
        } else {
            return (
            <View style={styles.iconContainer}>
                <Icon name="user" size={25} color="white" />
            </View>
        );
        }
    }

    return (
        <FormContainer formName='Friends'>

                {friends.map(friend => (
                    <View key={friend.clientid} style={styles.friendItem}>
                        { renderFriendImage(friend) }
                        <View style={[styles.friendDetails, myself === friend.clientid && styles.myselfDetails]}>
                            <Text style={styles.friendName}>{friend.clientname}</Text>
                            <Text style={styles.friendAmount}> {friend.paid}$</Text>
                            <Text style={styles.friendAmount}> {friend.total}$</Text>
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
    myselfDetails: {
        borderRadius: 40,
        borderColor: '#97DECC',
        borderWidth: 2,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 5,

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
    iconContainer: {
        borderRadius: 40,
        width: 40,
        height: 40,
        backgroundColor: '#97DECC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
});

export default FriendsInTable;
