import request from "@/api/NewApi/config";

//获取圣地巡游的接口
export const staticMap =()=>{
    return request({
        method: 'GET',
        url: "/map/staticPlace",

    })
}

//获取未来天气的接口
export const FutureWeather =(adcode)=>{
    return request({
        method: 'GET',
        url: '/map/FutureWeather',
        params: {
            adcode:adcode
        }
    })
}
//获取当前时刻天气接口
export const NowWeather =(adcode)=>
{
    return request({
        method: 'GET',
        url:'/map/NowWeather',
        params: {
            adcode: adcode
        }
    })
}


export default {
    staticMap,
    FutureWeather,
    NowWeather
}
