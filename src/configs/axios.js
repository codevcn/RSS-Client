import axios from 'axios'

export const axios_client = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
})

export const axios_config = { withCredentials: true }
