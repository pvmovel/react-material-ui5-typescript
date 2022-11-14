import axios from 'axios';

import { Environments } from '../../../environment';
import { responseInterceptor, errorInterceptor } from './interceptors';


const Api = axios.create({
  baseURL: Environments.URL_BASE
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
);

export { Api };