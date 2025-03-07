import axios from "axios";

const instance = axios.create({
    //baseURL 访问路径的前缀
    //timeout 请求超时的时间
    //headers 统一设置的全局请求头
    baseURL: '/yigo',
    headers: {
        'Content-Type': 'application/json'
    }
})
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    console.log(`本地存储的token为:${token}`)
    if (token) {
        config.headers.token = `${token}`
    }
    return config
}, e => Promise.reject(e))
//拦截器
instance.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})
export default instance
