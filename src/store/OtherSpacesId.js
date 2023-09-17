//使用pinia来管理需要用户查询的ID
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";

export  const OtherSpacesIds = defineStore('SpacesId',()=>{

    const getSpacesId = ref('error2000')
    //getter
    const OtherSpacesId = computed(()=>{
        return getSpacesId.value
    })

    //actions
    function  getOtherSpaceId(data){
        getSpacesId.value = data
    }
    //向外暴露
    return {OtherSpacesId, getOtherSpaceId}
})



