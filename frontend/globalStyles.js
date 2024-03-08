import { StyleSheet } from "react-native";


const backgroundColor = "#3D3D3D";
const mainColor = "#97DECC";



export const globalStyles = StyleSheet.create({

    screenColor: {
        flex: 1,
        backgroundColor: backgroundColor,

    },

    image: {
        width: 200,
        height: 100,
    },

    icons: {
        position: 'absolute',
        fontSize: 40,
        color: mainColor,
    },

    headerIconLeft: {
        top: 50,
        left: 20,
    },

    headerIconRight: {
        top: 50,
        right: 20,
    },

    shadowBottom: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },

    formHeadLine: {
        position: 'relative',
        backgroundColor: mainColor,
        borderRadius: 50,
        marginHorizontal: 50,
    },

    formHeadLineText: {
        padding: 10,
        fontSize: 30,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },

    searchContain: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EFEFEF",
        borderRadius: 50,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    textInput: {
        flex: 1,
        fontSize: 25,
    },
    searchIcon: {
        fontSize: 20,
        color: backgroundColor,
        marginLeft: 10,
    },

    BellIconRight: {
        right: 10,
    },
    

    });
    
