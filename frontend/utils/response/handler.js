import { Alert } from 'react-native';
import { successCodes, errorCodes } from './codes';

async function handleResponse(response, navigation, callback=null, skipErrorHandling=false) {
    const { success, error } = response;
    if (success) {
        const { status, data } = success;
        await handleSucsess(status, data, callback);
    } else {
        const { status, message } = error;
        await handleError(status, message, navigation, skipErrorHandling ? callback : null);
    }

    return success ? success.status : error.status;
}

async function handleSucsess(status, data, callback) {
    try {
        const printData = JSON.stringify(data);
        successCodes[status] &&
        successCodes[status].logMessage &&
        console.log(successCodes[status].logMessage, `Data is: ${printData}`);
        if (!callback) {
            console.log('No callback function provided');
            return;
        }

        console.log('Execute callback function...');
        await callback(data, null)
        console.log('Callback function executed successfully');

    } catch (error) {
        console.error('Error in callback function:', error);
        Alert.alert('Error', 'An error occurred. Please try again later.');
    }
}

async function handleError(status, error, navigation, callback=null) {
    if (!callback) {
        const errorHanler = errorCodes[status] || errorCodes[500];
        const title = errorHanler.title || 'Error';
        const logMessage = errorHanler.logMessage || errorHanler.message;
        let navigateTo = errorHanler.navigateTo;

        console.error(logMessage, `Status code is: ${status}`, `Error message is: ${error}`);
        navigateTo = navigateTo ? navigateTo : 'Home';
        Alert.alert(
            title,
            errorHanler.message,
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate(navigateTo)
                },
            ],
        )
        return;
    }

    await callback(null, {status, error});
}

export { handleResponse, handleSucsess, handleError };