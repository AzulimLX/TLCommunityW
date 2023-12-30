<template>
  <div class="header" >
    <el-button @click="GOTOMain" class="topbtn01" color="#E6E6E6" data-aos="fade-down" v-show="showButtons"  >首 页  </el-button>
    <el-button @click="smoothScroll" class="topbtn02" color="#E6E6E6" data-aos="fade-down" v-show="showButtons" >文章</el-button>
    <el-button @click="GOTOMap" class="topbtn05" color="#E6E6E6" data-aos="fade-down" v-show="showButtons">圣地巡游</el-button>
    <el-button @click="GOTODan" class="topbtn03" color="#E6E6E6" data-aos="fade-down" v-show="showButtons">留言板</el-button>
    <el-button @click="GOTOChat" class="topbtn04" color="#E6E6E6" data-aos="fade-down" v-show="showButtons">聊天室</el-button>

    <div class="header-right"
         data-aos="slide-left"
         data-aos-anchor-placement="top-bottom"
         v-show="showButtons"
    >
      <el-dropdown class="head">
          <span>
          <el-avatar
              fit="fill" shape="square"  :src="userInfo.photo?userInfo.photo:'' "
          />
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="GOTOSpcaes">个人信息及展示</el-dropdown-item>
            <el-dropdown-item divided @click="GOTOFriend">添加好友</el-dropdown-item>

            <el-dropdown-item divided @click="GOTOAddFriend">
              申请通知
              <el-badge :value="count" class="" @click="GOTOAddFriend"></el-badge>
            </el-dropdown-item>


            <el-dropdown-item divided>Action 4</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>

      </el-dropdown>
    </div>

  </div>
</template>

<script setup>
import {GetNotReadCount} from "@/api/NewApi/Friends";


//跳转到主页面
const GOTOMain = ()=>{
  router.push("main")

}

//跳转到地图页面
const GOTOMap = ()=>{
  router.push("map")
}

//跳转到留言版
const GOTODan =()=>{
  router.push("barrage")
}

//跳转到个人空间
const GOTOSpcaes =()=>{
  router.push("spaces")
}

/*跳转到添加好友开始*/
const GOTOFriend = ()=>{
   router.push("AddFriend")
}
/*跳转到添加好友结束*/
//跳转到好友信息通知
const GOTOAddFriend = ()=>{
  router.push("AddFriendMsg")
}

/*跳转到聊天页面*/
const GOTOChat = ()=>{
  router.push("chat")
}

/*头像开始*/
import {getInfo} from "@/api/NewApi/login";
const userInfo = ref({photo:"",username:""})

/*头像结束*/
import api from '@/api/NewApi/Main.js'
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {useTokenStore} from "@/store/Mytoken";
import {onMounted, ref} from "vue";

//用户退出按钮开始
const logout = async ()=>{
  //首先询问是否要退出
  await ElMessageBox.confirm("确认要退出吗？","退出提示",{
    confirmButtonText:"确认",
    cancelButtonText:"取消",
    type:'warning',
  }).catch(()=>{
    ElMessage.info("取消退出操作")
    return new Promise(() => {})
  })
  //执行退出
  await api.logout().catch( () => {})
  ElMessage.success("用户登出成功")
  //清空token信息,跳转到首页
  useTokenStore().saveToken('')
  router.push('/')
}
/*点击滚动开始*/
//document.documentElement.scrollHeight 为获取整个文档的高度


const smoothScroll =()=>{
  const articleElement = document.getElementById('article-section');
  if (articleElement) {
    const targetPosition = articleElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const duration = 1000; // 滚动时间，单位毫秒
    const startTime = performance.now();

    const scrollStep = timestamp => {
      const currentTime = timestamp - startTime;
      const progress = Math.min(currentTime / duration, 1); // 限制进度在 0 到 1 之间
      const easedProgress = easeInOutCubic(progress); // 使用缓动函数，可以根据需要更改

      window.scrollTo(0, startPosition + (targetPosition - startPosition) * easedProgress);

      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    };

    requestAnimationFrame(scrollStep);
  }
};

// 缓动函数示例（使用 easeInOutCubic）
const easeInOutCubic = t => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
/*点击滚动结束*/

/*尝试文章平稳出现*/
import AOS from 'aos'
import 'aos/dist/aos.css'

// ...你的其他代码...
const count = ref(0)
onMounted(async () => {
  AOS.init();
  await getInfo().then((res) =>{
    if (res !=null) {
      userInfo.value = res.data.data
    }
  })

  //找信息数量
  if(userInfo.value.photo !== "") {
    const res = await GetNotReadCount(userInfo.value.user);
    count.value = res.data.data
  }
});

const handleScroll = () => {
  AOS.refresh();

  const currentScrollY = window.scrollY;
  const scrollDirection = currentScrollY > prevScrollY ? 'down' : 'up';

  if (scrollDirection === 'down') {
    showButtons.value = false;
  } else {
    showButtons.value = true;
  }

  prevScrollY = currentScrollY;
};
/*尝试文章平稳出现*/


/*来点头部按钮移动*/
const showButtons = ref(true);
let prevScrollY = window.scrollY;

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});


/*来点头部按钮移动*/

//用户退出按钮结束

</script>



<style src="@/assets/css/Main/Main.css" scoped>
[data-aos="fade-down"] {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 结束状态：透明度为 1，恢复到原始位置 */
[data-aos="fade-down"].aos-animate {
  opacity: 1;
  transform: translateY(0);
}



</style>
