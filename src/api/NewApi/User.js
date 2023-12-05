import request from "@/api/NewApi/config";

export const selectAllUser = ()=>{
    return request({
        method: 'GET',
        url: '/user/GetAllUser'
    })
}

export default {
    selectAllUser
}