
function buildHeaders(userToken=null, clientToken=null) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (userToken) {
      headers['Authorization'] = `Bearer ${userToken}`;
    }
    if (clientToken) {
      headers['clienttoken'] = clientToken;
    }
  
    return headers;
  }

function buildUrl(endpoint) {
    return `${process.env.URL}/${endpoint}`;
}

function buildRequest(endpoint, method, headers, body=null) {
    if (method === 'GET' && body) {
        throw new Error('GET requests should not have a body');
    }
    if (method === 'POST' && !body) {
        throw new Error('POST requests should have a body');
    }

    const url = buildUrl(endpoint);
    const content = method === 'GET' ? { method, headers } : { method, headers, body: JSON.stringify(body) };
    return {url, content};
}

export { buildHeaders, buildUrl, buildRequest };