import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";

export  const useTokenStore = defineStore('mytoken',()=>{
    //把返回的token拿出来并转化为对象
    const tokenJson = ref("")
    // computed 相当于 getter（属性处理方法）
    const token = computed(()=>{
        try {
            return JSON.parse(tokenJson.value || window.localStorage.getItem("TokenInfo") || "{}")
        }catch (err)
        {
           ElMessage.error("json字符串格式不正确，转化失败")
            window.localStorage.setItem("TokenInfo","")
            throw err
        }

    })

    //function 相当于actions
    function saveToken(data){
        tokenJson.value = data
        window.localStorage.setItem("TokenInfo",data);
    }
    //向外暴露
   return {token, saveToken}
})
