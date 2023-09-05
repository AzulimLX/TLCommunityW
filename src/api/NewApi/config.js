import axios from "axios"

const request = axios.create({
    //一个基本地址
    baseURL:'http://localhost:5000',
    //定义统一请求头
    headers: {
        'Content-Type':'application/json;charset=UTF-8',
        'Authorization':localStorage.token
    },
    //请求超时时间
    timeout: 10000,
    withCredentials: true //允许cookie
})

import {useTokenStore} from "@/store/Mytoken";
import {refresh} from "@/api/NewApi/login";
import {useRouter} from "vue-router/dist/vue-router";
//请求拦截器   config:代表接口信息
request.interceptors.request.use((config)=>{
    //首先判断请求里是否有headers，如果没有则创建
    if (!config.headers)
    {
        config.headers= {}
    }
    const store = useTokenStore() //获取token
    //把相应的token添加到请求头中
    config.headers.Authorization = store.token?.token
    return config
})

//响应拦截器
//与请求不同，响应拦截器有两个情况，一个是成功回调，一个是失败回调
import router from "@/router";
import {ElMessage} from "element-plus";
request.interceptors.response.use(
    (response)=> response,

    async (error) => {
    if (error.response.status === 401)
    {   //刷新token
       const  data  =  await refresh()
       if (data.data.status ===200)
       {
           //保存新token
           useTokenStore().saveToken(data.data.data)
           //重新请求token，并且把结果返回
           return request(error.config)
       }
       else {
           //如果失败，则跳转到登录页
           ElMessage.error("访问间隔时间过久，需要重新登录")
           router.push("/")
           return
       }

    }
    return Promise.reject(error)
})

export default request