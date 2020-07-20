import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-a-burger-b1157.firebaseio.com'
});

export default instance;
