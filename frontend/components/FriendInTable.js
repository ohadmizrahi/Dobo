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
        // Calculate the total height of the content
        let contentHeight = 0;
        friends.forEach(friend => {
            // Assuming each friend item has a fixed height of 80
            contentHeight += 1;
        });
        if (contentHeight<=4) contentHeight=4;
        // Adjust container height based on content height and device height
        const screenHeight = Dimensions.get('window').height;
        const maxContainerHeight = screenHeight * 0.6; // 60% of screen height
        setContainerHeight(Math.min(contentHeight*80, maxContainerHeight));
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
        ...styles.detailsContainer,
        margin: 0,
        padding: 10,
        paddingHorizontal: 50,
        maxWidth: '100%',
      };

    return (
    <View style={{ height: containerHeight }}>
            <FormContainer formName='Friends' style={newDetailsContainerStyle}>
            <ScrollView>
                {friends.map(friend => (
                    <View key={friend.clientid} style={styles.friendItem}>
                        <View style={[styles.friendDetails, myself === friend.clientid && styles.myselfDetails]}>
                        { renderFriendImage(friend) }
                            <Text style={styles.friendName}>{friend.clientname}</Text>
                            <Text style={styles.friendAmount}> {friend.paid}$</Text>
                            <Text style={styles.friendAmount}> {friend.total}$</Text>
                            <Icon name="circle" size={25}     color={friend.active ? "green" : "red"} style={styles.iconStatus}/>
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: -20,
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
        borderColor: '#97DECC',

    },
    friendDetails: {
        flex: 1,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
        borderColor: '#fff',
        borderWidth: 2,
        justifyContent: 'center',
        alignContent: 'center',
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
        flex: 1,
        textAlign: 'center',
        margin: 5,
    },
    iconStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginLeft: 10,
    }
});

export default FriendsInTable;
