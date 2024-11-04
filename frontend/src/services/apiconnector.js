import axios from 'axios'


export const axiosInstance = axios.create({})

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
        headers: header || null,
        params: params || null,
        withCredentials: true
    })
}