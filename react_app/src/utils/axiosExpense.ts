import axios from 'axios'


const host = 'http://127.0.0.1:8000'

const axiosExpense = axios.create({
    baseURL: `${host}/api`
})


export default axiosExpense