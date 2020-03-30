import axios from 'axios';
import * as constant from './constant'
import * as authHeader from './authHeader'
import { authService } from './authService';
import { pages } from './../components/utils/page'
import { PresentToast } from '../components/utils/commonComp';
import i18next from 'i18next';
import { toast } from 'react-toastify';

export function initInterceptors() {
    axios.defaults.baseURL = constant.baseUrl;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.interceptors.request.use(request => {
        document.body.classList.add('custom-loader')
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
        document.body.classList.remove('custom-loader');
        return response;
    }, function (error) {
        if(error.response && error.response.status === 401){

            authService.logout()
        }

        return Promise.reject(error);
    });
}

export function handleErrorResponse(error: any){
    if(!error.response){
        PresentToast(i18next.t('COMMON.COMMON_SERVER_ERROR'), toast.TYPE.ERROR)
        return
    }
    if(error.response.status === 400){
        PresentToast(error.response.data, toast.TYPE.ERROR)
    }
}