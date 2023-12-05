import request from "@/api/NewApi/config";

export const getAllDan =()=>{
    return request({
        url:'dan/getAll',
        method: 'GET'
    })
}

export const saveDan = (req)=>{
    return request({
        url:"dan/saveDan",
        method:'POST',
        data: req
    })
}

export default {
    getAllDan
}