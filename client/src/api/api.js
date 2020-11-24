import axios from 'axios'

const axiosInstance = axios.create(
    {
        baseURL: 'http://localhost:3002/api/'
    });

export const authAPI = {
    register(formData) {
        return axiosInstance.post(`auth/register`, formData)
            .then(response => {
                return response.data
            })
            .catch(error => {
                // debugger
                return error.response.data
            });
    },
    login(formData) {
        return axiosInstance.post(`auth/login`, formData)
            .then(response => {
                return response.data
            })
            .catch(error => {
                // debugger
                return error.response.data
            });
    },
    getUser(userId) {
        return axiosInstance.get(`/auth/user/${userId}`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                // debugger
                return error.response.data
            });
    }
}