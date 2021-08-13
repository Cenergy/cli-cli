import axiosOrigion from 'axios';

const maxRequestTimeout = 15000;

// use instance for private config
const axios = axiosOrigion.create();

axios.defaults.timeout = maxRequestTimeout;

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        // 提示到界面
        console.error(error);
        console.log(error.response.data);
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
