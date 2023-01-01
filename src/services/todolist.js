import axios from "axios";

const baseUrl = '/api/tasks';

const getAll = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then(response => response.data);
}

const create = (newObj) => {
    const request = axios.post(`${baseUrl}`, newObj);
    return request.then(response => response.data);
}

const del= (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const service = { getAll, create, del, update};

export default service;