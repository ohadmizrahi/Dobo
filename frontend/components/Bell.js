import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '@Root/globalStyles';

export default function Bell({ navigation }) {
    const [showButtons, setShowButtons] = useState(false);
    const toggleButtons = () => {
        setShowButtons(!showButtons);
    }

    return (
        <View style={styles.bellContainer}>
            {showButtons ? (
                <TouchableOpacity onPress={toggleButtons}>
                    <View style={[styles.bellBackground,styles.bellComponentPressed]}>
                        <Icon name="bell" style={[styles.bellIcon, globalStyles.icons]} />
                            <TouchableOpacity style={[styles.activeTableButton,styles.button]} onPress={() => navigation.navigate('TableStatus')}>
                                  <Text style={styles.buttonText}>Active Table</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.qrButton,styles.button]} onPress={() => navigation.navigate('QRScanner')}>
                                  <Text style={styles.buttonText}>QR</Text>
                            </TouchableOpacity>
                           <TouchableOpacity style={[styles.joinButton,styles.button]} onPress={() => navigation.navigate('JoinTable')}>
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
