import axios from 'axios'


const host = 'http://127.0.0.1:4000'

const axiosUser = axios.create({
    baseURL: `${host}/api`
})


export default axiosUser