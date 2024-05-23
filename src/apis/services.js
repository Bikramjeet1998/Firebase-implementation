const BASE_URL = "https://api.ivalt.com/";

export const post = (URL, data = {}) => {
    return fetch(`${BASE_URL}${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'gFaDRf5dzZ19QOJ9MRUqt1HACxkZOChv342TzOEe'
        },
        body: JSON.stringify(data)
    });
}


export const sendNotificationApi = async (mobile) => {
    return await post('biometric-auth-request', {
        mobile
    });
}

export const verifyAuthUserApi = async (mobile) => {
    return await post('biometric-auth-result', {
        mobile
    });
}