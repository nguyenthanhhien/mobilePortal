import {
    DealerApplicationConfigurationModel
} from '../models/models'
import axios from 'axios';
import { ApplicationNameModel } from '../models/applicationNameModel';

export const dealerApplicationConfigurationService = {
    getAll,
    add,
    update,
    getByKey,
    getApplicationNames
}

const apiCtrlUrl = "/dealerApplicationConfiguration"

function getAll(query: any) {
    let page = query.page + 1
    let itemsPerPage = query.pageSize
    let sort = query.orderBy ? (query.orderBy.field + '-' + query.orderDirection) : ""
    let search = query.search
    return axios.get(`${apiCtrlUrl}/getAll?page=${page}&itemsPerPage=${itemsPerPage}&sort=${sort}&search=${search}`)
        .then(result => {
            return result?.data
        })
}

function add(object: DealerApplicationConfigurationModel) {

    return axios.post<string>(`${apiCtrlUrl}/add`, JSON.stringify(object))
        .then(res => {
            return res?.data
        })
}

function update(object: DealerApplicationConfigurationModel) {
    return axios.put<string>(`${apiCtrlUrl}/update/${object.DealerApplicationConfigurationKey}`, object)
        .then(res => {
            return res?.data
        })
}

function getByKey(key: number) {
    return axios.get<DealerApplicationConfigurationModel>(`${apiCtrlUrl}/getByKey?key=${key}`)
        .then(result => {
            return result?.data
        })
}

function getApplicationNames() {
    return axios.get<ApplicationNameModel[]>(`${apiCtrlUrl}/getApplicationNames`)
        .then(result => {
            return result?.data
        })
}