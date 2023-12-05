<template>
  <div class="box">
   <el-scrollbar class="friends_box">
     <div class="friends_title">
       我的好友列表
       <img class="friends_img" src="friend.png">
     </div>

   </el-scrollbar>

   <div class="community_box">
     <div class="community_box_top">
     <div class="community_title">正在与 xxxxx 聊天</div>
     </div>
     <el-scrollbar id="message" class="community_show" ref="scrollContainer" >
       <div v-for="(messageItem , index) in messages" :key="messageItem.id">
         <div :class="[messageItem.ids === nowUser.value ? 'MY_messageShow' : 'F_messageShow']" v-if="index !== long">
           <el-avatar :class="[messageItem.ids === nowUser.value ? 'MY_messageShow_img' : 'F_messageShow_img']"  :size="80" :src="messageItem.photo" />
           <div :class="[messageItem.ids === nowUser.value ? 'MY_messageShow_name' : 'F_messageShow_name']">{{messageItem.name}}</div>

         </div>
         <div class="messageShow_space">
         <div :class="[messageItem.ids === nowUser.value ? 'MY_messageShow_content' : 'F_messageShow_content']"  v-if="index !== long">
           <div :class="[messageItem.ids === nowUser.value ? 'MY_messageShow_bubble' : 'F_messageShow_bubble']" v-if="messageItem.isFile">
             <el-image
                 style="width: 100px; height: 100px"
                 :src="messageItem.targetFile[0]"
                 :preview-src-list="messageItem.targetFile"
                 :fit="'contain'">
               <template #error>
                 <a :href="messageItem.targetFile[0]">
                   <div style="height: 60px; width: 60px; float: left; margin-top: 20px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                     {{ messageItem.fileName[0]}}
                     <br/>
                     <br/>
                     类型:
                     <br/>
                     {{ messageItem.fileName[1]}}
                   </div>
                   <img style="height: 40px; width: 40px; margin-top: 30px;" src="upload.png" />
                 </a>
               </template>
             </el-image>
           </div>
           <div :class="[messageItem.ids === nowUser.value ? 'MY_messageShow_bubble' : 'F_messageShow_bubble']" v-else>
             {{ messageItem.content }}
           </div>
         </div>
         </div>

       </div>

     </el-scrollbar>

     <div class="community_type">
      <img class="community_photo" src="photo.png"/>
       <el-upload
        action="http://localhost:5000/file/upload"
        v-model:file-list="file"
        :on-success="handleFileUpload"
        :show-file-list="false"
       >
       <img class="community_upload" src="upload.png" />
       </el-upload>
       <img class="community_emoji" src="emoji.png" @click="isShowEmoji" />

       <EmojiPicker class="community_emoji_show" :native="true" @select="onSelectEmoji" v-show="showEmoji.value" />
     </div>

     <el-input    v-model="textarea"
                  :rows="6"
                  type="textarea"
                  placeholder="请输入聊天内容"
                  class="community_inputs"
                  @blur="blurEvent"
     >

     </el-input>

     <el-button class="community_button" type="success" @click="send" plain >发送</el-button>
   </div>

  </div>

</template>

<script setup>

import {nextTick, onMounted, reactive, ref} from "vue";
import {getInfo} from "@/api/NewApi/login";
import {CommunityIds} from "@/store/CommunityTo";


let websocket = null;
const inputs = ref(null);
const textarea = ref('')
const messages = ref([]);
let long
const nowUser = reactive({
  value:''
})
let MyInfor = reactive({});

const file = ref([]);

/*文件上传开始*/
//上传成功后的方法
const handleFileUpload = (response, file, fileList)=>{
  //这里应该把文件突出去

  console.log(response)
  const f =  response.data.split("/")
  const OtherF = f[5].split(".")
  messages.value.push({ id: Date.now(),ids: MyInfor.user , content: response.data ,name: MyInfor.username , photo: MyInfor.photo , isFile: true , fileName: [OtherF[0],OtherF[1]] , targetFile: [response.data] });
  console.log(MyInfor)

}

const uploadFile = ()=>{
  console.log("点击成功")
}
/*文件上传结束*/


/*emoji开始*/
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'

// import css
import 'vue3-emoji-picker/css'
import {selectNewMsg} from "@/api/NewApi/World_msg";
import handleScroll from "aos/src/js/helpers/handleScroll";

const inputRef = ref(null);

let blurIndex = null;

const blurEvent = (e)=>{
  blurIndex = e.target.selectionStart;//光标所在的位置
}

const onSelectEmoji = (emoji)=>{
  console.log(emoji)
  const index = blurIndex;
  const str = textarea.value;
  textarea.value = str.slice(0,index) + emoji.i + str.slice(index)
}

const showEmoji = reactive({
  value: false
})

const isShowEmoji = ()=>{
  showEmoji.value = !showEmoji.value
}


/*emoji结束*/
/*滚动条开始*/
const scrollContainer = ref(null);
const scrollToBottom = () => {
  nextTick(() => {
    const container = scrollContainer.value.$el;
    const contentHeight = container.scrollHeight;
    const containerHeight = container.clientHeight;
    const scrollHeight = contentHeight - containerHeight;
    if (scrollHeight > 0) {
      container.scrollTop = scrollHeight;
    }
  });
};

onMounted(async ()=>{

   const res = await getInfo()
   //首先获取用户信息
   MyInfor = res.data.data
   const IDS = res.data.data.user
   nowUser.value = IDS
   //发送升级请求
  if ('WebSocket'in window) {
    websocket = new WebSocket("ws://localhost:5000/websocket/"+IDS);
  } else {
    alert('Not support websocket')
  }
  websocket.onerror = function (){
    alert("连接失败")
  }
  websocket.onopen = function (){
    alert("连接成功")
  }
  //连接关闭的回调方法
  websocket.onclose = function() {
    alert("关闭连接")
  }
  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function() {
    websocket.close();
  }
  //连接成功了,后端能收到ID
  //监听信息
  //在token刷新时，会请求多一个连接，这个问题得解决一下
  websocket.onmessage =  (event)=>{
    //在监听时，判断本机session信息，如果信息不一样，则样式向左，若信息一样，则样式向右
    const messageContent = event.data;
    //根据 : 来分开数组
    const target = messageContent.split(":")
    messages.value.push({ id: Date.now(),ids: target[0] , content: target[1] ,name:target[2] , photo:target[3] , isFile: false});

  }
  inputs.value = document.querySelector('.community_inputs');

  //查询最新的十条消息
  selectNewMsg().then(res=>{
    //直接遍历
    const ss = res.data.data
    ss.forEach( function (item, index){
      messages.value.push({id: Date.now(),ids: item.user , content: item.msg ,name:item.userName , photo:item.photo , isFile: false})
    })
     long = ss.length

  })
  console.log(scrollContainer.value.$el); // 打印容器元素
  scrollToBottom();
})
//发送信息方法
const send = ()=>{
   console.log(scrollContainer.value.$el); // 打印容器元素
   //首先获取输入框的信息
   //使用小菠萝存储要发给谁的状态
   //获取接收人信息
   const cm = CommunityIds()
   const IDS = cm.getCommunityId

   var socketMsg = {msg:textarea.value, toUser:IDS, fromUser: MyInfor.user}
   //包装发送的JSON信息
   if (IDS === undefined || IDS === '')
   {
        //说明在世界频道
        socketMsg.type = 0;
   }
   else
   {   //说明是单聊
       socketMsg.type = 1;
   }
   websocket.send(JSON.stringify(socketMsg))
   textarea.value=''
}


</script>

<style src="@/assets/css/teee.css" scoped>


</style>
