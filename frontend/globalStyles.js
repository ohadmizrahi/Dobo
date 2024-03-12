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
        height: 80,
        alignSelf: 'center',
    },
    icons: {
        fontSize: 40,
        color: mainColor,
    },
    headerIconLeft: {
        left: 20,
    },
    headerIconRight: {
        right: 20,
    },
    shadowBottom: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonSocial: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 20,
        fontSize: 30,
        borderRadius: 10,
        marginBottom: 10,
        textAlign: 'center',
        width: '70%',
        height: '70%',
        alignSelf: 'center',
        },

    socialtext:{
        color: '#000',
        fontWeight:'bold',
        opacity: 1,
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
        textAlign: "center",
        opacity: 1,
    },
    profilePictureContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 140,
        color: 'white',
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
    BellIconRight: {
        right: 10,
    },
    Logoutcontainer: {
        width: '80%',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom:'10%',
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
        marginHorizontal: 80,
        margin:10,
        alignSelf: 'center'
    },

    formHeadLineText: {
        position: 'absolute',
        padding: 10,
        fontSize: 30,
        borderRadius: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
});