import axios from 'axios';

const GET = 'GET';
const POST = 'POST';

const request = (method, url, params) => new Promise((resolve, reject) => {
    if (typeof params !== 'object') params = {};
    const options = {
        method,
        url,
        baseURL: 'https://stuart-frontend-challenge.now.sh/',
        validateStatus: (status) => status >= 200 && status < 300,
        ...params,
    };

    axios.request(options).then((response) => {
        if (response.status === 200) {
            resolve(response.data);
        } else {
            resolve({ response });
        }
    }).catch((error) => {
        resolve({ error });
    });
});

const API = {
    geocode: async (data) => await request(POST, 'geocode', { data }),
    createJob: async (data) => await request(POST, 'jobs', { data }),
};

export default API;
