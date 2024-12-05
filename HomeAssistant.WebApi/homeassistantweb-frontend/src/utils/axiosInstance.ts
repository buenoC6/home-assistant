import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.1.37:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
