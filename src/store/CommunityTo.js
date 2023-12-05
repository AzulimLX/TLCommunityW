//管理对谁发送信息的状态
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";

export  const CommunityIds = defineStore('CommunityId',()=>{
    //一开始是空的，默认世界频道
    const CommunityId = ref('')
    //getter
    const getCommunityId = computed(()=>{
        return getCommunityId.value
    })

    //actions
    function  setCommunityId(data){
        CommunityId.value = data
    }
    //向外暴露
    return {getCommunityId, setCommunityId}
})



