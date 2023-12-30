import request from "@/api/NewApi/config";
//获取所有好友信息
export const getAllFriends = (mainId)=>{
    return request({
        method: "GET",
        url: "/Friend/getAllFriend",
        params: {
            MainId:mainId
        }
    })
}
//发送好友请求
export const sendAddFriendMsg = (mainId,toId,information)=>{
    return request({
        method: "POST",
        url: "/Friend/AddFriend",
        params: {
            MainId:mainId,
            information: information,
            ToId: toId
        }
    })
}
export const GetNotReadCount = (mainId)=>{
    return request({
        method: "GET",
        url: "/Friend/GetNotReadCount",
        params: {
            MainId: mainId
        }
    })
}

export const GetNotReadMsg = (mainId)=>{
    return request({
        method: "GET",
        url: "/Friend/GetNotReadMsg",
        params: {
            MainId: mainId
        }
    })
}
export const AgreeAdd = (MainId,FromId)=>{
    return request({
        method: "POST",
        url: "/Friend/AgreeAdd",
        params: {
            MainId: MainId,
            FromId: FromId
        }
    })
}

export const DisAgreeAdd = (MainId,FromId)=>{
    return request({
        method: "POST",
        url: "/Friend/disAgreeAdd",
        params: {
            MainId: MainId,
            FromId: FromId
        }
    })
}

export const getAllFriendInfo = (MainId)=>{
    return request({
        method: "GET",
        url: "/Friend/getAllFriendInfo",
        params:{
            MainId: MainId
        }
    })
}

export default {
    getAllFriends,
    sendAddFriendMsg,
    GetNotReadCount,
    GetNotReadMsg,
    AgreeAdd,
    DisAgreeAdd,
    getAllFriendInfo,
}