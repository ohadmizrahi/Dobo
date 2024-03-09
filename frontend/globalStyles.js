import { StyleSheet } from "react-native";

const backgroundColor = "#3D3D3D";
const mainColor = "#97DECC";

export const globalStyles = StyleSheet.create({
    screenColor: {
        flex: 1,
        backgroundColor: backgroundColor,
    },
    image: {
        width: 400,
        height: 200,
        backgroundColor: '#000',
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
    button: {
        backgroundColor: "#fff",
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