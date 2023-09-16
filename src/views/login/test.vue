<template>
  <!--头部开始-->
  <Header/>
  <!--头部结束-->
  <div class="body">
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
  <div class="square">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
  <div class="circle">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
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



</script>



<style src="@/assets/css/test.css" scoped>

</style>