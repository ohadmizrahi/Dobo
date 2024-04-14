const errorCodes = {
    400: {
        title: 'Bad Request',
        message: 'Bad Request. Please check your input.',
        logMessage: 'Bad Request, check the request data',
    },
    401: {
        title: 'Unauthorized',
        message: 'Unauthorized. Please check your credentials.',
        logMessage: 'Unauthorized, check the provided credentials',
    },
    403: {
        title: 'Forbidden',
        message: 'Forbidden. You do not have permission to access this resource.',
        logMessage: 'Forbidden, insufficient permissions',
    },
    404: {
        title: 'Not Found',
        message: 'Not Found. The resource you are looking for could not be found.',
        logMessage: 'Not Found, check the resource URL',
    },
    405: {
        title: 'Method Not Allowed',
        message: 'Method Not Allowed. Please check your request method.',
        logMessage: 'Method Not Allowed, check the request method',
    },
    409: {
        title: 'Conflict',
        message: 'Conflict. The request could not be completed due to a conflict with the current state of the resource.',
        logMessage: 'Conflict, check the request data and compare with the current state of the resource',
    },
    429: {
        title: 'Server Overloaded',
        message: 'Too Many Requests. You have sent too many requests in a given amount of time.',
        logMessage: 'Too Many Requests, consider implementing a rate limit',
    },
    500: {
        title: 'Internal Server Error',
        message: 'Internal Server Error. Something went wrong on our end.',
        logMessage: 'Internal Server Error, check the server logs for more details',
    },
};

const successCodes = {
    200: {
        logMessage: 'Request was successful',
    },
    201: {
        logMessage: 'Resource was created successfully',
    },
    204: {
        logMessage: 'Request was successful, but no content was returned',
    },
};

export { errorCodes, successCodes };