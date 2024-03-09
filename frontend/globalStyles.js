import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3D3D3D",
        padding: 60,
        alignItems: "center",

    },
    image: {
        width: 400,
        height: 200,
        backgroundColor: '#000'
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
        opacity: 1
    },
    profilePictureContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 140,
      },
      profilePictureText: {
        fontSize: 24,
        color: '#000',
      },
      profilePictureImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
    });
    
