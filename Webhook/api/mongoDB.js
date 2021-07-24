const Axios = require('axios');

const axiosBase = Axios.create({
	baseURL: 'https://bajaj-backend.herokuapp.com',
});

module.exports = axiosBase;
