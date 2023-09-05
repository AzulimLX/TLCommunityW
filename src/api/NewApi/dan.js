import request from "@/api/NewApi/config";

export const getAllDan =()=>{
    return request({
        url:'dan/getAll',
        method: 'GET'
    })
}


export default {
    getAllDan
}