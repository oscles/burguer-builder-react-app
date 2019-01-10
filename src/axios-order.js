import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://builder-bulger.firebaseio.com'
});

export default instance;
