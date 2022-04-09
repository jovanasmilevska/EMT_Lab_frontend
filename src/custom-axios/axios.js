import axios from "axios";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_HOST_ENV,
    baseURL: `https://backendemt.herokuapp.com`,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})
export default instance
