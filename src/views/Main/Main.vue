<template>

  <div class="test">
  <!--头部开始-->
  <div class="header" >
    <el-button @click="roll" class="topbtn01" color="#E6E6E6" data-aos="fade-down" v-show="showButtons"  >首 页  </el-button>
    <el-button @click="smoothScroll" class="topbtn02" color="#E6E6E6" data-aos="fade-down" v-show="showButtons" >文章</el-button>
    <el-button class="topbtn05" color="#E6E6E6" data-aos="fade-down" v-show="showButtons">圣地巡游</el-button>
    <div class="list05"></div>
    <el-button class="topbtn03" color="#E6E6E6" data-aos="fade-down" v-show="showButtons">留言板</el-button>
    <el-button class="topbtn04" color="#E6E6E6" data-aos="fade-down" v-show="showButtons">关于我们</el-button>

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
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>


  </div>
  <!--头部结束-->

  <!--背景图-->
  <div class="banner">
    <carousel/>
  </div>

  <!--主体部分-->
  <div id="article-section" class="container" >

    <div v-for="(blog,index) in artList"
         :key="blog.id"
         class="article"
         :data-aos="'fade-up'"
    >
      <!--文章开始-->
      <div  class="article">
        <div class="articleTitle" >
          {{blog.title}}
        </div>
        <div class="articleContent">
          {{blog.content}}
        </div>
        <div class="articleImg">
          <img src="../../assets/images/test.jpg">
        </div>
        <div class="articleAuthor">
          <a href="http://localhost:8080/otherspace" class="articleAuthor-otherSpace"></a>
          <el-avatar class="articleAuthor-Img" :size="80" :src="blog.photo"/>

          <div class="articleAuthor-name">{{blog.username}}</div>
        </div>
      </div>
    </div>

    <el-pagination class="page"
                   layout="prev, pager, next"
                   background
                   :page-size="refpage.pageSize"
                   :total="refpage.total"
                   :page-count="Math.ceil(refpage.total/refpage.pageSize)"
                   @current-change="sizeChange"
                   @prev-click="sizeChange"
                   @next-click="sizeChange"
                   v-model:current-page="currentPage1"

    />
    <el-button @click="test" >测试</el-button>

  </div>
  </div>
</template>

<script setup>
import Carousel from "@/views/utils/Carousel.vue";

/*头像开始*/
import {getInfo} from "@/api/NewApi/login";
const userInfo = ref({photo:"",username:""})
getInfo().then((res) =>{
  if (res !=null) {
    userInfo.value = res.data.data
  }
  console.log(useTokenStore().token)

})
/*头像结束*/
import api from '@/api/NewApi/Main.js'
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {useTokenStore} from "@/store/Mytoken";

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
//用户退出按钮结束


/*分页及文章开始*/
import {getArticle} from "@/api/NewApi/Main";
import {onMounted, ref, toRef, toRefs} from "vue";
const currentPage1 = toRef(1)
const pageSize1 = toRef(5)
//设置分页参数
const pagenation = {
  page: currentPage1.value,
  pageSize: pageSize1.value,
  name: ''
}
const refpage = {
  total: 50,
  pageSize: 5,

}
//文章内容
const artList = ref([])
const loadBlogs = async ()=>{
  let res = await getArticle(pagenation)
  console.log(res)
  refpage.total = res.data.data.total
  refpage.pageSize = res.data.data.size
  artList.value = res.data.data.records

}
const sizeChange = ()=>{
  pagenation.page=currentPage1.value
  pagenation.pageSize = pageSize1.value
  //调用获取页面信息接口，并且装进显示的列表
  getArticle(pagenation).then((res)=>{
    console.log(res)
    refpage.total = res.data.data.total
    artList.value = res.data.data.records
  })
}
//开始时候就进行读取
onMounted(()=>{
  loadBlogs()
})
/*分页及文章结束*/

/*点击滚动开始*/
//document.documentElement.scrollHeight 为获取整个文档的高度
const roll = ()=>{
  console.log(pagenation.page)
  window.scrollTo(0,850)

}

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

onMounted(() => {
  AOS.init();
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

const test = ()=>{

  console.log(pagenation.page)
  console.log(pagenation.pageSize)
  console.log(refpage.total)

}



</script>

<style src="@/assets/css/Main.css" scoped>
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
