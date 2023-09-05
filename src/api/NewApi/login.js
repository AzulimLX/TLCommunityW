import request from "@/api/NewApi/config";
import {useTokenStore} from "@/store/Mytoken";



//用户请求登录
export  const Nlogin=(req)=>{
    return request({
        method: 'post',
        url: '/login',
        data: req
        //如果是传送{phone:'xxxx',password:'2222'}表单 形式 "Content-Type": "application/x-www-form-urlencoded"
        //data: `phone=${}&password=${}`
        //传送json
        //data: req
    })
}

//获取用户信息
export const getInfo =(req)=>{
    return request({
        method: 'GET',
        url: '/main/getUser',
        data: req
    })
}

//刷新token,promise表示异步操作结果对象，
// 当我们发送异步请求时，返回的就是Promise对象，这里用来拓宽请求的操作
// （本来直接return回去，现在new一个接住它处理完我们事情后扔出去）
let promiseRT = Promise
let isRefreshing = false

export const refresh = ()=>{
    if (isRefreshing)
    {
        return promiseRT
    }
    isRefreshing  = true
    promiseRT = request({
        method:'POST',
        url:'/user/refresh_token',
        params: {
            refreshtoken: useTokenStore().token?.refreshtoken
        },
    }).finally(()=>{
        isRefreshing = false
    })
    return promiseRT
}


export default {
    Nlogin,
    getInfo,
    refresh
}