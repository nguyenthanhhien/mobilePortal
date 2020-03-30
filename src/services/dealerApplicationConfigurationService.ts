import {
    BaseObjectManagementModel,
    DealerApplicationConfigurationModel
} from '../models/models'
import axios from 'axios';

export const dealerApplicationConfigurationService = {
    getAll,
    add,
    update,
    getByKey
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
    return axios.put<string>(`${apiCtrlUrl}/update/${object.DealerApplicationConfigurationKey}`, JSON.stringify(object))
        .then(res => {
            return res?.data
        })
}

function getByKey(key: number) {
    return axios.get(`${apiCtrlUrl}/getByKey?key=${key}`)
        .then(result => {
            return result?.data
        })
}