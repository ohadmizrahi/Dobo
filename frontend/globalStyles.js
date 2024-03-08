import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    screenColor: {
        flex: 1,
        backgroundColor: "#3D3D3D",

    },

    image: {
        width: 200,
        height: 100,
    },

    icons: {
        position: 'absolute',
        fontSize: 40,
        color: '#97DECC',
    },

    headerIconLeft: {
        top: 50,
        left: 20,
    },

    headerIconRight: {
        top: 50,
        right: 20,
    },

    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },

    button: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: 200,
    },

    buttonText: {
        color: "#000",
        fontSize: 20,
        textAlign: "center",
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
        backgroundColor: '#97DECC',
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
    });
    
