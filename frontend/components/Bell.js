import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../globalStyles';


export default function Bell() {
    const [showButtons, setShowButtons] = useState(false);

    const toggleButtons = () => {
        setShowButtons(!showButtons);
    }

    return (
        <View style={styles.bellContainer1}>
            <View style={[styles.bellContainer, showButtons && styles.expanded]}>
                <Icon name="bell" style={[globalStyles.icons, globalStyles.BellIconRight]} onPress={toggleButtons} />
                {showButtons && (
                    <View style={styles.buttonContainer}>
                        <CustomButton title="Join" />
                        <CustomButton title="QR" />
                        <CustomButton title="Active Table" />
                    </View>
                )}
            </View>
        </View>
    );
}


const CustomButton = ({ title }) => {
    return (
        <TouchableOpacity style={[styles.button, title === 'Join' && styles.joinButton, title === 'QR' && styles.qrButton]}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    bellContainer1: {
        position: 'absolute',
        bottom: 50,
        right: 30,
    },
    bellContainer: {
        backgroundColor: 'yellow',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    expanded: {
        width: 350,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 5,
        marginRight: 20,
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    joinButton: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    qrButton: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
});