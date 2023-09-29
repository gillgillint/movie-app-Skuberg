import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
      api_key:`${process.env.NEXT_PUBLIC_MOVIES_API_KEY}`,
    }),
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((res) => {
  if (res && res.data) {
    return res.data;
  }

  return res;
}, (error)=>{
    throw error
});


export default axiosClient
