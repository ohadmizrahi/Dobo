import { Alert } from 'react-native';
import { successCodes, errorCodes } from './codes';

async function handleResponse(response, successCallback) {
    const { success, error } = response;
    if (success) {
        const { status, data } = success;
        await handleSucsess(status, data, successCallback);
    } else {
        const { status, message } = error;
        await handleError(status, message);
    }
}

async function handleSucsess(status, data, callback) {
    try {
        const printData = JSON.stringify(data);
        successCodes[status] &&
        successCodes[status].logMessage &&
        console.log(successCodes[status].logMessage, `Data is: ${printData}`);

        console.log('Execute callback function...');
        callback(data)
        console.log('Callback function executed successfully');
    } catch (error) {
        console.error('Error in callback function:', error);
        Alert.alert('Error', 'An error occurred. Please try again later.');
    }
}

async function handleError(status, error) {
    const errorHanler = errorCodes[status] || errorCodes[500];
    const title = errorHanler.title || 'Error';
    const logMessage = errorHanler.logMessage || errorHanler.message;

    log.error(logMessage, `Status code is: ${status}`, `Error message is: ${error}`);
    Alert.alert(title, errorHanler.message);
}

export { handleResponse, handleSucsess, handleError };