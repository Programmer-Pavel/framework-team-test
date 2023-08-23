import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'https://test-front.framework.team/'
});

export default axiosBase;
