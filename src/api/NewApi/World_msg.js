import request from "@/api/NewApi/config";

//查询最新十条数据
export const selectNewMsg = ()=>{
    return request({
        method: 'GET',
        url: "/WorldMsg/SelectNewMsg"
    })
}

export default {
    selectNewMsg
}
