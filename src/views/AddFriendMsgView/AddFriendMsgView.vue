<template>
  <div>
    <Header/>
    <div class="box">
      <div class="PageName">好友申请列表</div>
      <el-scrollbar class="result-box" max-height="400px">
        <div v-for="(item, index) in ItemArray" :key="index">
          <div class="show-box-container">
          <div class="boxFor">
            <el-avatar class="avatar" shape="square" :size="50" :src="item.photo" />
            <div class="avatar-name">{{item.username}}(id: {{item.fromId}} )</div>
            <div class="information">验证消息:  {{item.information}}</div>
          </div>
            <el-button class="Agree" type="success" @click="agreeAdd(item.toId,item.fromId)">
              同意添加
            </el-button>
            <el-button class="disAgree" type="danger" @click="disAgreeAdd(item.toId,item.fromId)">
              拒绝添加
            </el-button>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import Header from "@/views/utils/Header.vue";
import { onMounted, ref } from "vue";
import {AgreeAdd, DisAgreeAdd, GetNotReadMsg} from "@/api/NewApi/Friends";
import { getInfo } from "@/api/NewApi/login";
import {ElMessage} from "element-plus";

async function SuccessElM(res) {
  if (res.data.data === "成功添加好友")
  {
    ElMessage({
      message: "成功添加好友",
      type: 'success'
    })
  }
  else
  {
    ElMessage({
      message: "添加失败，请刷新重试",
      type: "error"
    })
  }
}
const agreeAdd = (MainId,FromId)=>{
     AgreeAdd(MainId,FromId).then(async (res)=>{
           await SuccessElM(res)
           location.reload()
  })
}


async function ErrorElM(res)
{
  if (res.data.data === "成功拒绝")
  {
    ElMessage({
      message: "成功拒绝添加",
      type: 'success'
    })
  }
  else
  {
    ElMessage({
      message: "出现错误，请刷新页面重试",
      type: "error"
    })
  }
}

const disAgreeAdd = (MainId,FromId)=>{
  DisAgreeAdd(MainId,FromId).then(async (res)=>{
    await ErrorElM(res)
    location.reload()
  })
}



const item = ref();
const userInfo = ref();
let ItemArray = ref([]);

onMounted(async () => {
  userInfo.value = await getInfo().then((res) => {
    return res.data.data;
  });

  item.value = await GetNotReadMsg(userInfo.value.user).then((res) => {
    return res.data.data;
  });

  // 在Promise解析中赋值ItemArray
  ItemArray.value = item.value.slice();
  console.log(ItemArray.value)
});
</script>

<style scoped src="@/assets/css/AddFriendMsg/AddFriendMsg.css">
</style>
