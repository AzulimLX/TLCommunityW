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
import {getAllDan} from "@/api/NewApi/dan";
import async from "async";
import Header from "@/views/utils/Header.vue";


const mask = ref(null);
const bottom = ref(null);
const content = ref(null);
let dataArray = reactive([])

onMounted(() => {
  mask.value = document.querySelector('.mask');
  bottom.value = document.querySelector('.bottom');
  content.value = document.querySelector('.content');

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
const sent = () => {
  if (!content.value.value) return alert('请输入弹幕内容，亲')
  //创建一个div
  const div = document.createElement('div')
  //将div加入到mask中
  mask.value.append(div)
  //给div设置内容，内容是 用户输入的文字
  div.innerHTML = content.value.value
  //给div添加text类名
  div.classList.add('TanText')
  //清空文本框
  content.value.value = ''
  //重新让文本框获取焦点
  content.value.focus()
  //随机生成div的位置
  //随机数 * 设置div的位置
  //生成随机数
  const random = Math.random() * (mask.value.offsetHeight - bottom.value.offsetHeight - div.offsetHeight)
  div.style.top = random + 'px'
  //让这个div动起来
  //平移：transform: translateX()
  //过度:  transition: all .3s
  //linear为速度平滑
  div.style.transition = 'all 10s linear'
  div.style.transform = `translateX(-${mask.value.offsetWidth}px)`
};


</script>

<style src="@/assets/css/barrage/barrage.css" scoped>

</style>
