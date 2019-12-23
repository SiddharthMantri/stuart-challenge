import axios from 'axios';


const GET = 'GET';
const POST = 'POST';

const request = (method, url, data) => {
    return new Promise((resolve, reject) => {
        axios({
            baseURL: 'https://stuart-frontend-challenge.now.sh/',
            method,
            url,
            data
        }).then((response) => {
            if (response.status === 200) {
                resolve(response.data);
            } else {
                resolve({
                    error: 'Incorrect '
                })
            }
        }).catch((error) => {
            resolve({
                error
            });
        });
    });
};

const API = {
    geocode: async (data) => request(POST, 'geocode', data),
};

export default API;
