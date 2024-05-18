import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { storeData, getData } from '@Utils/storage/asyncStorage';
import FormContainer from '@Components/FormContainer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';


const FriendsInTable = ({ friends }) => {
    const [myself, setMyself] = useState(null);
    const [containerHeight, setContainerHeight] = useState(null);

    useEffect(() => {
        getData('client').then(client => {
            setMyself(JSON.parse(client).clientId);
        });
    }, []);

    useEffect(() => {
        const nFriends = friends.length;
        const screenHeight = Dimensions.get('window').height;
        const maxContainerHeight = screenHeight * 0.65;
        const currentHeight = Math.max(nFriends * 220, screenHeight * 0.35)
        console.log('currentHeight', currentHeight, screenHeight);
        setContainerHeight(Math.min(currentHeight, maxContainerHeight));
    }, [friends]);

    storeData('FriendsData', friends);

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
    const newDetailsContainerStyle = {
        paddingHorizontal: '9%',
      };

    return (
    <View style={{ height: containerHeight }}>
            <FormContainer formName='Friends' style={newDetailsContainerStyle}>
            <ScrollView >
                {friends.map(friend => (
                    <View key={friend.clientid} style={styles.friendItem}>
                        <View style={[styles.details, myself === friend.clientid && styles.myself]}>
                        <View style={styles.friendDetails}>
                        { renderFriendImage(friend) }
                            <Text style={styles.friendName}>{friend.clientname}</Text>
                            <Text style={styles.friendAmount}> {friend.paid}$</Text>
                            <Text style={styles.friendAmount}> {friend.total}$</Text>
                            <Icon name="circle" size={25} color={friend.active ? "green" : "red"} style={styles.iconStatus}/>
                        </View>
                        </View>
                    </View>
                ))}
                </ScrollView>
                <View style={styles.grid}>
                    <View style={styles.gridRow}>
                        <Text style={styles.gridText}>Payed:</Text>
                        <Text style={styles.gridText}>Out of:</Text>
                        <Text style={styles.gridText}>Left:</Text>
                    </View>
                    <View style={styles.gridRow}>
                        <Text style={styles.gridText}>{totalPaid.toFixed(2)}$</Text>
                        <Text style={styles.gridText}>{totalToPay.toFixed(2)}$</Text>
                        <Text style={styles.gridText}>{(totalToPay - totalPaid).toFixed(2)}$</Text>
                    </View>
                </View>
        </FormContainer>
    </View>


    );
};

const styles = StyleSheet.create({
    friendItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        height: 90,
    },
    friendImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    details: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: '100%',

    },
    myself: {
        borderColor: '#97DECC',
        borderRadius: 40,
        borderWidth: 2,
    },
    friendDetails: {
        flex: 2,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    friendName: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left',

    },
    friendAmount: {
        flex: 1.2,
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        padding: 5,
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
    grid: {
        flexDirection: 'column',
        marginTop: 20
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        margin: 5,
    },
    iconStatus: {
        flex: 0.5,
        flexDirection: 'column',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        
    }
});

export default FriendsInTable;
