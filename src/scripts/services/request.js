import axios from "axios";
import { API_BASE_URL } from "./api.js";

//get all data
async function getAll(endpoint) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };

    await axios
        .get(API_BASE_URL + endpoint)
        .then((response) => {
            console.log("axios response: ", response);
            result.data = response.data;
        })
        .catch((err) => {
            result.error = err;
        })
        .finally(() => {
            result.loading = false;
        });

    return result;
}

//get one data by ID
async function getByID(endpoint, id) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };

    await axios
        .get(API_BASE_URL + endpoint + `/${id}`)
        .then((response) => {
            console.log("axios response: ", response);
            result.data = response.data;
        })
        .catch((err) => {
            result.error = err;
        })
        .finally(() => {
            result.loading = false;
        });

    return result;
}

//post new data
async function post(endpoint, payload) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .post(API_BASE_URL + endpoint, payload)
        .then((response) => {
            console.log("axios response: ", response);
            result.data = response.data;
        })
        .catch((err) => {
            result.error = err;
        })
        .finally(() => {
            result.loading = false;
        });

    return result;
}

//update data by ID
async function updateOne(endpoint, payload, id) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .patch(API_BASE_URL + endpoint + `/${id}`, payload)
        .then((response) => {
            console.log("axios response: ", response);
            result.data = response.data;
        })
        .catch((err) => {
            result.error = err;
        })
        .finally(() => {
            result.loading = false;
        });

    return result;
}

//delete data by ID
async function deleteOne(endpoint, id) {
    const result = {
        data: null,
        loading: true,
        error: null,
    };
    await axios
        .delete(API_BASE_URL + endpoint + `/${id}`)
        .then((response) => {
            console.log("axios response: ", response);
            result.data = response.data;
        })
        .catch((err) => {
            result.error = err;
        })
        .finally(() => {
            result.loading = false;
        });

    return result;
}

const controller = {
    getAll: getAll,
    getByID: getByID,
    post: post,
    deleteOne: deleteOne,
    updateOne: updateOne,
};

export default controller;