import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

$axios.interceptors.request.use(
  (config) => {
    console.log('>>> process.env', process.env)
    console.log(
      '>>> process.env.NEXT_PUBLIC_ENV_TYPE',
      process.env.NEXT_PUBLIC_ENV_TYPE,
    )
    console.log(
      '>>> process.env.NEXT_PUBLIC_API_BASE_URL',
      process.env.NEXT_PUBLIC_API_BASE_URL,
    )
    console.log('>>> axios request interceptor', config)
    return config
  },
  (error) => {
    // console.log('>>> axios request error interceptor', error)
    return Promise.reject(error)
  },
)

$axios.interceptors.response.use(
  (response) => {
    console.log('>>> axios response interceptor', response)

    return response
  },
  (error) => {
    // console.log('>>> axios response error interceptor', error)
    return Promise.reject(error)
  },
)

export default $axios
