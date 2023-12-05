import request from "@/api/NewApi/config";

export const getAllFriends = (mainId)=>{
    return request({
        method: "GET",
        url: "/Friend/getAllFriend",
        params: {
            MainId:mainId
        }
    })
}

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

export default {
    getAllFriends,
    sendAddFriendMsg
}