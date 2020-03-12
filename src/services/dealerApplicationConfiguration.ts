import {
    BaseObjectManagementModel,
    DealerApplicationConfigurationModel
} from './../models/models'
import axios from 'axios';

export const dealerApplicationConfigurationService = {
    getAll
}

function getAll(page: number, itemsPerPage: number, sort: string) {
    return axios.get(`/dealerApplicationConfiguration/getAll?page=${page}&itemsPerPage=${itemsPerPage}&sort=${sort}`)
        .then(result => {
            return result?.data
        })
}