import request from "@/api/NewApi/config";


export const logout =(req)=>{
    return request({
        method: 'POST',
        url: "/main/logout",
        data: req
    })
}

export const getArticle = (req)=>{
    return request({
        method:'GET',
        url:"/page",
        params : {
            page: req.page,
            pageSize: req.pageSize,
            name: req.name
        }
    })
}


export default {
    logout,
    getArticle
}

