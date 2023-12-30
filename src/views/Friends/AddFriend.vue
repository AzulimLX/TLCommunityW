<template>
  <div class="TotalBox">
   <Header/>
   <!--一个搜索框-->
  <div class="search-box">
  <div class="inputbox">
    <input required="required" v-model="searchTerm" type="text">
    <span>请输入你要搜索的ID或用户名</span>
    <i></i>
  </div>

    <button class="button">
  <span>
    <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
  </span>
    </button>

  </div>

  <el-scrollbar class="result-box" max-height="400px">
    <div v-for="item in filteredItems" :key="item.user">
   <div class="show-box-container">
      <div class="show-box">
        <el-avatar class="avatar" shape="square" :size="50" :src="item.photo" />
        <div class="avatar-name">{{item.username}}(id: {{item.user}} )</div>
      </div>
      <el-button @click="sendAddFriend(item.user)" class = "send_request_button" type="primary" :disabled="item.status === 1">
        申请好友
      </el-button>
   </div>
    </div>


  </el-scrollbar>

  </div>

</template>


<script setup>
import Header  from "@/views/utils/Header.vue";
import {ref, computed, onMounted} from 'vue';
import {selectAllUser} from "@/api/NewApi/User";
import {getInfo} from "@/api/NewApi/login";
import {getAllFriends, sendAddFriendMsg} from "@/api/NewApi/Friends";
import {ElMessage, ElMessageBox} from "element-plus";

let list = ref([])
let userInfo = ref()
let friends = ref([])
onMounted(async ()=>{
  //首先获取在登录的账号
  await getInfo().then((res) =>{
    if (res !=null) {
      userInfo.value = res.data.data
    }
  })
 //之后获取该账户所有朋友的账号
   friends.value = await getAllFriends(userInfo.value.user)
  //创建个数组
  const friendItem = ref([])
  friendItem.value = await friends.value.data.data.map(item=>{
    return item.friendId;
  })

  const result = await selectAllUser()

  list.value = result.data.data.map(item =>{
    let sta = 0
    if (item.user === userInfo.value.user)
    {
      sta = 1
    }
    else if (item.user === 'error2000')
    {
      sta = 1
    }
    else if (friendItem.value.includes(item.user))
    {
       sta = 1
    }
    return {
      ...item,
      status: sta
    };


  })

})

const searchTerm = ref('');
const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return list.value.filter(item => {
    const userMatch = item.user.toLowerCase().includes(term);
    const usernameMatch = item.username.toLowerCase().includes(term);
    return userMatch || usernameMatch;
  });
});

//添加好友
const sendAddFriend = (ToId)=>{
  ElMessageBox.prompt('输入好友验证信息','好友验证信息',{
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
      .then(({ value }) =>{
        //直接进行一个请求发送
        const mge =  sendAddFriendMsg(userInfo.value.user,ToId,value)
        console.log(mge)
         ElMessage({
           type: 'success',
           message: '发送好友申请成功',
         })
      })
      .catch(()=>{
        ElMessage({
          type: 'info',
          message: '取消发送好友申请',
        })
      })

}

</script>



<style scoped src="@/assets/css/Friends/AddFriend.css">

</style>