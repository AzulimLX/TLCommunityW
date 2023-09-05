import axios from "axios";

//创建axios实例
const Service = axios.create(
    {
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
    }
)

//提交请求拦截器
Service.interceptors.request.use((config)=>{
    //配置请求头
    config.headers.Authorization=window.sessionStorage.getItem('token')===null?null:window.sessionStorage.getItem('token')
    return config
})


//提交响应拦截器
Service.interceptors.response.use((response)=>{
    //获取接口返回结果
    const res = response.data;
    if (res.status ===200)
    {
        return res

    }
    else {
        ElMessage.error(res.message || '网络异常')
        return res
    }
})

export default Service


