import axios from 'axios';
import * as constant from './constant'
import * as authHeader from './authHeader'
import { authService } from './authService';
import { pages } from './../components/utils/page'

export function InitInterceptors() {
    axios.defaults.baseURL = constant.baseUrl;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.interceptors.request.use(request => {
        // perform a task before the request is sent
        let currentPage = window.location.pathname
        if(currentPage !== pages.Login){
            request.headers.common['Authorization'] = authHeader.getAuth();
        }
        
        return request;
    }, error => {
        // handle the error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        // Do something with response error
        if(error.response.status === 401){

            authService.logout()
        }
        return Promise.reject(error);
    });
}