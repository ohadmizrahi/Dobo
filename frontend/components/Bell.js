import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '@Root/globalStyles';


export default function Bell({navigation}) {
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
                        <CustomButton title="Join" onPress={() => navigation.navigate('JoinTable')} />
                        <CustomButton title="QR" onPress={() => navigation.navigate('JoinTable')} />
                        <CustomButton title="Active Table" onPress={() => navigation.navigate('TableStatus')} />
                    </View>
                )}
            </View>
        </View>
    );
}

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, title === 'Join' && styles.joinButton, title === 'QR' && styles.qrButton]} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    bellContainer1: {
        position: 'absolute',
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
