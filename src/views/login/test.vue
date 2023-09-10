<template>
 <div class="boxx">
   <!--头部开始-->
   <Header/>
   <!--头部结束-->

   <!--放置名片开始-->
   <div class="card-box" data-aos="fade-right" data-aos-duration="500">
     <!--显示头像开始-->
     <el-avatar class="card-avatar" :size="120" shape="circle" fit="fill" :src="userInfo.photo?userInfo.photo:'' "/>
     <!--显示头像结束-->

     <!--显示姓名开始-->
     <div class="card-name">{{ spacesInfo.username }}</div>
     <!--显示姓名结束-->

     <!--显示简短的个人介绍开始-->
     <div class="card-content">{{spacesInfo.content}}</div>
     <!--显示简短的个人介绍结束-->

     <!--展示拥有平台开始-->
     <div class="card-go" >


       <a class="spaces-bili" :href= spacesInfo.bili v-show="spacesInfo.bili !==null"></a>
       <a class="space-github" :href="spacesInfo.github" v-show="spacesInfo.github !== null"></a>
       <a class="spaces-csdn" :href="spacesInfo.csdn" v-show="spacesInfo.csdn !== null"></a>
       <a class="spaces-jue" :href="spacesInfo.juejin" v-show="spacesInfo.juejin !== null " ></a>

     </div>
     <!--展示拥有平台结束-->

   </div>
   <!--放置名片结束-->

   <!--修改栏开始-->
   <div class="main-box" data-aos="fade-right" data-aos-duration="500">
     <!--昵称栏开始-->
     <div class="self-name">昵称</div>
     <el-input v-model="spacesInfo.username" class="input-name" placeholder="改一个炫酷的昵称吧"></el-input>
     <!--昵称栏结束-->
     <!--简介栏开始-->
     <div class="self-content">个人简介</div>
     <el-input class="input-content" v-model="spacesInfo.content" :rows="3" type="textarea" placeholder="请介绍你自己吧!"></el-input>
     <!--简介栏结束-->
     <!--其他平台账号开始-->
     <div class="self-bilibili">个人bilibili平台地址</div>
     <el-input v-model="spacesInfo.bili" class="input-bilibili" placeholder="写下你的bilibili空间地址，让更多人认识你吧!"></el-input>

     <div class="self-github">个人github平台地址</div>
     <el-input v-model="spacesInfo.github" class="input-github" placeholder="写下你的github空间地址，让更多人认识你吧!"></el-input>

     <div class="self-csdn">个人CSDN平台地址</div>
     <el-input v-model="spacesInfo.csdn" class="input-csdn" placeholder="写下你的csdn空间地址，让更多人认识你吧!"></el-input>

     <div class="self-jue">个人稀土掘金平台地址</div>
     <el-input v-model="spacesInfo.juejin" class="input-juejin" placeholder="写下你的稀土掘金空间地址，让更多人认识你吧!"></el-input>

     <!--其他平台账号结束-->

     <button  @click="update(spacesInfo)" class="flash-button">更新数据</button>
     <!--提交按钮结束-->

   </div>
   <!--介绍栏结束-->


 </div>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

//设置头部开始
import Header from "@/views/utils/Header.vue";
//设置头部结束
/*头像开始*/
import {getInfo, getInfoById} from "@/api/NewApi/login";
import {AllSpaceData, UpdatedData} from "@/api/NewApi/spaces";
import {useTokenStore} from "@/store/Mytoken";
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router/dist/vue-router";
const userInfo = ref({photo:"",username:""})
const spacesInfo = ref({author:"",username:"",content:"",bili:"",github:"",csdn:"",microblog:"",zhihu:"",juejin:""})
const users = reactive({user:'sssss'})
/*头像结束*/
//出现动画
onMounted(async()=>{
  AOS.init()
  const res = await getInfo();
  if (res != null)
  {
    userInfo.value = res.data.data
    users.user = res.data.data.user
    await AllSpaceData(users.user).then((res)=>{
      spacesInfo.value = res.data.data

    })

  }
})
const router = useRouter()
//更新按钮接口
const update = (data)=>{
    UpdatedData(data).then(res=>{
      if (res.data.data === "更新成功")
      {
        router.go(0)
        ElMessage({
          message: "更新内容成功",
          type: 'success'
        })
      }else
      {
          ElMessage.error("看来发生了点错误，请稍后重试")
      }

    })
}


</script>



<style src="@/assets/css/test.css" scoped>

</style>