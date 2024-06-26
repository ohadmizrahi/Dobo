import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

const FormContainer = ({ children, formName, displayHeadline = true, style }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.detailsContainer, style ]}>
                {displayHeadline && (
                    <View style={[styles.formHeadLine, styles.shadowBottom]}>
                        <Text style={styles.formHeadLineText}>{formName}</Text>
                    </View>
                )}
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '10%',
      },
      detailsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#EFEFEF',
        margin: 10,
        padding: 20,
        maxWidth: '95%',
        paddingHorizontal: 30,
      },
      formHeadLine: {
        width: 300,
        height: 50,
        alignSelf: 'center',
        backgroundColor: '#97DECC',
        borderRadius: 50,
        marginTop: -40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      },
      formHeadLineText: {
        fontSize: 20,
        color: '#000',
      },
      shadowBottom: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
      },
});

export default FormContainer;