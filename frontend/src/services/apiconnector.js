import axios from 'axios'



export const axiosInstance = axios.create({})

const token =localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null

export const apiConnector = (method, url, bodyData, header, params) => {
    return axiosInstance({
        // method:`${method}`,
        // url:`${url}`,
        // data:bodyData? bodyData:null,
        // headers:header?header:null,
        // params:params?params:null,
        // withCredentials: true 
        method: method,
        url: url,
        data: bodyData || null,
        headers: {
            ...header,
            Authorization: token ? `Bearer ${token.token}` : undefined 
        },
        params: params || null,
        withCredentials: true
    })
}