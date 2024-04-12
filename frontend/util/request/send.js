import { buildHeaders, buildRequest } from './build';
import { removeData, storeData, getData } from '../localStorage';

async function refreshToken(source) {
    let headers = null;
    let endpoint = null;
    if (source === 'user') {
        await removeData('userToken');
      const refreshToken = await getData('userRefreshToken');
      endpoint = 'api/auth/token/refresh';
      headers = buildHeaders(refreshToken, null)

    } else if (source === 'client') {
      await removeData('clientToken');
      const userToken = await getData('userToken');
      const refreshToken = await getData('clientRefreshToken');
      endpoint = 'api/table/auth/refresh';
      headers = buildHeaders(userToken, refreshToken)
    }

    const { url, content } = buildRequest(endpoint, 'GET', headers);

    const { success, error } = await sendRequest(url, content, true);

    if (error) {
        throw new Error('Token refresh failed');
    }

    const { token, tokenForRefresh } = success.data;
    await storeData(`${source}Token`, token);
    await storeData(`${source}RefreshToken`, tokenForRefresh);

    return { token, tokenForRefresh };
}

async function sendRequest(url, content, ignoreTokenExperation=false) {
    try {
        const response = await fetch(url, content);
        const responseData = await response.json();

        if (response.status === 403) {
            if (ignoreTokenExperation) {
                return { error: { status: response.status, message: responseData.message }};
            } else {
                const currentUserToken = await getData('userToken');
                const { clienttoken } = content.headers;
                
                const { token: newToken } = await refreshToken(responseData.source);
                const { userToken, clientToken } = responseData.source == 'user' ? { userToken: newToken, clientToken: clienttoken } : { userToken: currentUserToken, clientToken: newToken };
                const headers = buildHeaders(userToken, clientToken);
                return await sendRequest(url, { ...content, headers }, true);
            }
        }
            
        if (!response.ok) {
            console.error(`ERROR: ${responseData.message}`);
            return { error: { status: response.status, message: responseData.message }};
        }
        return { success: { status: response.status, data: responseData } };

    } catch (error) {
        throw new Error(`ERROR: ${error.message}`);
    }
}

async function sendGetRequest(endpoint, tokens={}) {
    const { userToken, clientToken } = tokens;
    const ignoreTokenExperation = !tokens ? true : false;
    
    const headers = buildHeaders(userToken, clientToken);
    const {url, content} = buildRequest(endpoint, 'GET', headers);
    
    const {success, error} = await sendRequest(url, content, ignoreTokenExperation);

    return success ? success : error;
    
}

async function sendPostRequest(endpoint, body, tokens={}) {
    const { userToken, clientToken } = tokens;
    const ignoreTokenExperation = !tokens ? true : false;
    
    const headers = buildHeaders(userToken, clientToken);
    const {url, content} = buildRequest(endpoint, 'POST', headers, body);

    const {success, error} = await sendRequest(url, content, ignoreTokenExperation);

    return success ? success : error;
    
}

export { sendGetRequest, sendPostRequest, refreshToken };