import { buildHeaders, buildUrl, buildRequest } from './build';

async function refreshToken(source) {
    let headers = null;
    let url = null;
    if (source === 'user') {
      localStorage.removeItem('userToken');
      const refreshToken = localStorage.getItem('userRefreshToken');
      const endpoint = 'api/auth/token/refresh';
      headers = buildHeaders(refreshToken)
      url = buildUrl(endpoint);

    } else if (source === 'client') {
      localStorage.removeItem('clientToken');
      const userToken = localStorage.getItem('userToken');
      const refreshToken = localStorage.getItem('clientRefreshToken');
      const endpoint = 'api/table/auth/refresh';
      headers = buildHeaders(userToken, refreshToken)
      url = buildUrl(endpoint);
    }

    const refreshResponse = await fetchAPI(url, 'GET', headers, null);

    if (!refreshResponse.ok) {
        throw new Error('Token refresh failed');
    }

    const { token, tokenForRefresh } = refreshResponse.data;
    localStorage.setItem(`${source}Token`, token);
    localStorage.setItem(`${source}RefreshToken`, tokenForRefresh);

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
                const { token } = await refreshToken(responseData.source);
                const { userToken, clientToken } = responseData.source == 'user' ? { userToken: token, clientToken: null } : { userToken: null, clientToken: token };
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