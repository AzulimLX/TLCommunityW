import request from "@/api/NewApi/config";

//先获取用户所有空间信息
export const AllSpaceData = (data)=>{
    return request({
        method:'GET',
        url:'/spaces/UserSpacesData',
        params:{
            user:data
        }
    })
}

export default {
    AllSpaceData
}