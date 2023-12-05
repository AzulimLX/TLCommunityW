<template>
  <Header/>
  <div class="mask">

  </div>
  <!--底部发言框-->
  <div class="bottom">
    <input class="content">
    <a href="#" rel="external nofollow" @click="sent" class="send">发表言论</a>
  </div>
</template>

<script setup>
import {ref, onMounted, getCurrentInstance, reactive} from 'vue';


//测试获取弹幕
import {getAllDan, saveDan} from "@/api/NewApi/dan";
import async from "async";
import Header from "@/views/utils/Header.vue";
import AOS from "aos";
import {getInfo} from "@/api/NewApi/login";
import {AllSpaceData} from "@/api/NewApi/spaces";


const mask = ref(null);
const bottom = ref(null);
const content = ref(null);
let dataArray = reactive([])

onMounted(async () => {
  mask.value = document.querySelector('.mask');
  bottom.value = document.querySelector('.bottom');
  content.value = document.querySelector('.content');
  const res = await getInfo();
  if (res != null) {
    userInfo.value = res.data.data
  }
});
getAllDan().then(res =>{
  dataArray = JSON.parse(res.data.data);
  console.log(dataArray[0])
  //首先在里面进行遍历数组
  if (Array.isArray(dataArray)) {
    dataArray.forEach(function (item, index) {
      setTimeout(() => {
        const div = document.createElement('div');
        mask.value.append(div);
        div.classList.add('TanText');
        div.innerHTML = item.content;

        //创建图片
        const img  = document.createElement('div')
        //加入div里去
        div.append(img)
        //给img设定属性
        img.classList.add('danImg')
        img.style.backgroundImage = `url(${require('@/assets/images/'+item.photo)})`;

        div.insertBefore(img,div.firstChild)

        const random = Math.random() * (mask.value.offsetHeight - bottom.value.offsetHeight - div.offsetHeight);
        div.style.top = random + 'px';
        div.style.transition = 'all 15s linear';
        div.style.transform = `translateX(-${mask.value.offsetWidth+400}px)`;
      }, index * 1000); // 每次迭代延时 1000ms（1秒）
    });


  }else{console.log("不是数组")}
})



//发送弹幕
const userInfo = ref({photo:"",username:"",user:""})
//保存的弹幕信息
const dan = ref({author:"",content:""})
const sent = () => {
  if (!content.value.value) return alert('请输入弹幕内容，亲')
  //获取发送人的信息
  const photo = userInfo.value.photo

  //构建弹幕发送
  const div = document.createElement('div');
  mask.value.append(div);
  div.classList.add('TanText');
  div.innerHTML = content.value.value

  //创建图片
  const img  = document.createElement('div')
  //加入div里去
  div.append(img)
  //给img设定属性
  img.classList.add('danImg')
  img.style.backgroundImage = `url(${require('@/assets/images/'+photo)})`;

  div.insertBefore(img,div.firstChild)
  dan.value.content = content.value.value
  //点击发送后清空文本框
  content.value.value= ''
  //让文本框重新获取焦点（增强用户体验）
  content.value.focus()

  const random = Math.random() * (mask.value.offsetHeight - bottom.value.offsetHeight - div.offsetHeight);
  div.style.top = random + 'px';
  div.style.transition = 'all 15s linear';
  div.style.transform = `translateX(-${mask.value.offsetWidth+400}px)`;

  //保存弹幕信息
  dan.value.author = userInfo.value.user

  saveDan(dan.value).then((res)=>{
       console.log(res.data.data)
  })

};


</script>

<style src="@/assets/css/barrage/barrage.css" scoped>

</style>
