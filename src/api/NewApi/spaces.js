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
//获取他人空间信息
export const OtherSpaceData = (data)=>{
    return request({
        method:'GET',
        url:'/spaces/OtherSpacesData',
        params:{
            data
        }
    })
}


//更新用户所有空间数据
export const UpdatedData = (data)=>{
    return request({
        method: 'POST',
        url:'/spaces/UpdatedSpacesData',
        data:data
    })
}

export default {
    AllSpaceData,
    OtherSpaceData,
    UpdatedData
}