import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '@Root/globalStyles';
import { getData } from '@Utils/storage/asyncStorage';

async function checkForActiveTable(actionTrue, actionFalse) {
    const userToken = await getData('userToken');
    const clientToken = await getData('clientToken');
    const activeTable = clientToken && userToken ? true : false;
    if (activeTable) {
        actionTrue(userToken, clientToken);
    } else {
        actionFalse(userToken, clientToken);
    }
}

export default function Bell({ navigation }) {
    const [showButtons, setShowButtons] = useState(false);
    const toggleButtons = () => {
        setShowButtons(!showButtons);
    }

    async function handleActiveTable() {
        await checkForActiveTable(
            actionTrue=(userToken, clientToken) => navigation.navigate('TableStatus', { userToken, clientToken }),
            actionFalse=() => Alert.alert(
                'No Active Table',
                "You don't have an active table. Please join a table first.",
                [
                    {
                        text: 'Close',
                        onPress: () => setShowButtons(false),
                        style: 'cancel',
                    },
                    {
                        text: 'Join Table',
                        onPress: () => navigation.navigate('JoinTable'),
                    },
                    {
                        text: 'Scan QR',
                        onPress: () => navigation.navigate('QRScanner'),
                    }

                ],
            )
        );
    }

    async function handleQR() {
        await checkForActiveTable(
            actionTrue=(userToken, clientToken) => Alert.alert(
                'You already have an active table',
                "Do you want to go to your table?",
                [
                    {
                        text: 'Close',
                        onPress: () => setShowButtons(false),
                        style: 'cancel',
                    },
                    {
                        text: 'Go to table',
                        onPress: () => navigation.navigate('TableStatus', { userToken, clientToken })
                    }

                ],
            ),
            actionFalse=(userToken) => {
                userToken ?
                navigation.navigate('QRScanner') :
                (() => {
                    Alert.alert(
                    'You are not signed in',
                    'Do you want to sign in?',
                    [
                      {text: 'Yes', onPress: () => navigation.navigate('SignIn')},
                      {text: 'No', onPress: () => setShowButtons(false), style: 'cancel'}
                    ],{cancelable: true});
                  })(); 
            }
        );
    }

    async function handleJoinTable() {
        await checkForActiveTable(
            actionTrue=(userToken, clientToken) => Alert.alert(
                'You already have an active table',
                "Do you want to go to your table?",
                [
                    {
                        text: 'Close',
                        onPress: () => setShowButtons(false),
                        style: 'cancel',
                    },
                    {
                        text: 'Go to table',
                        onPress: () => navigation.navigate('TableStatus', { userToken, clientToken })
                    }

                ],
            ),
            actionFalse=(userToken) => {
                userToken ?
                navigation.navigate('JoinTable') :
                (() => {
                    Alert.alert(
                    'You are not signed in',
                    'Do you want to sign in?',
                    [
                      {text: 'Yes', onPress: () => navigation.navigate('SignIn')},
                      {text: 'No', onPress: () => setShowButtons(false), style: 'cancel'}
                    ],{cancelable: true});
                  })(); 
            }
        );
    }

    return (
        <View style={styles.bellContainer}>
            {showButtons ? (
                <TouchableOpacity onPress={toggleButtons}>
                    <View style={[styles.bellBackground,styles.bellComponentPressed]}>
                        <Icon name="bell" style={[styles.bellIcon, globalStyles.icons]} />
                            <TouchableOpacity style={[styles.activeTableButton,styles.button]} onPress={handleActiveTable}>
                                  <Text style={styles.buttonText}>Active Table</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.qrButton,styles.button]} onPress={handleQR}>
                                  <Text style={styles.buttonText}>QR</Text>
                            </TouchableOpacity>
                           <TouchableOpacity style={[styles.joinButton,styles.button]} onPress={handleJoinTable}>
                                <Text style={styles.buttonText}>Join</Text>
                           </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={toggleButtons}>
                    <View style={[styles.bellBackground,styles.regularBellComponent]}>
                        <Icon name="bell" style={[styles.bellIcon, globalStyles.icons]} />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    bellContainer: {
        position: 'relative',
        bottom: 80,
        zIndex: 999,
        right: 30,
        direction: 'rtl',
    },
    bellBackground: {
        backgroundColor: '#3D3D3D',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#97DECC',
    },
    regularBellComponent: {
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    bellComponentPressed: {
        borderRadius: 50,
        width: 350,
        height: 60,
        direction: 'rtl',
        flexDirection: 'row',
    },
    bellIcon: {
        alignSelf: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#97DECC',
        borderRadius: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTableButton: {
    marginLeft: 30,
    marginRight: 30,
    width: 120,
    },
    joinButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,  
    width: 50,
    marginLeft: 10,
    },
    qrButton: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        width: 50,
    },
});
