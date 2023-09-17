<template>
   <!--轮播图开始-->
  <div class="show-Box">
  <el-carousel height="784px" interval="5000" @change="handleCarouselChange"  v-model="activeIndex">
    <el-carousel-item v-for="(imagePath, index) in pn" :key="index">
      <div class="carousel-image" :style="{ backgroundImage: 'url(' + imagePath + ')' }"></div>
    </el-carousel-item>
  </el-carousel>
  </div>
  <!--轮播图结束-->
  <!--语言展示开始-->
  <!--mxj-->
  <div  v-if="activeContent === 'mxj'" class="mxj" >
     <div  class="mxjtalk" data-aos="fade-right" data-aos-duration="500">
      <a href="//localhost:8080"></a>
     </div>
     <div class="mxjWord"  data-aos="fade-left" data-aos-duration="500">
      <a href="//localhost:8080"></a>
     </div>
  </div>

  <!--wz-->
  <div v-else class="wz">
    <div class="wztalk" data-aos="fade-right" data-aos-duration="500">
      <a href="//localhost:8080"></a>
    </div>
    <div class="wzWord" data-aos="fade-left" data-aos-duration="500">
      <a href="//localhost:8080"></a>
    </div>

  </div>


  <!--语言展示结束-->

</template>

<script setup>
import {onMounted, ref} from "vue";
import AOS from 'aos'
import 'aos/dist/aos.css'
onMounted(() => {
  AOS.init();
});

const pn = ["mxjShow.jpg","wzShow.jpg"]

const activeContent = ref('mxj'); // 初始显示 mxj
const activeIndex = ref(0);

const handleCarouselChange = (index) => {
  // 当轮播图切换时，根据 index 来切换内容
  if (index === 0) {
    activeContent.value = 'mxj';
  } else {
    activeContent.value = 'wz';
  }
};

</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  display: block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}


.mxjtalk {
  position: absolute;
  width: 59px;
  height: 269px;
  left: 80px;
  top: 100px;
  z-index: 2;
  transition: opacity 0.5s ease; /* 添加过渡效果 */
}

.mxjtalk>a{
  display: block;
  width: 59px;
  height: 269px;
  background: url("@/assets/images/moxiaoju_talk.png") no-repeat;
  background-size: 100%;
  transition: opacity 0.5s ease;
}

.mxjWord {
  position: absolute;
  width: 100px;
  height: 100px;
  right: 500px;
  top: 600px;
  z-index: 8;
  transition: opacity 0.5s ease; /* 添加过渡效果 */
}

.mxjWord>a{
  display: block;
  width: 500px;
  height: 120px;
  background: url("@/assets/images/moxiaoju_word.png") no-repeat;
  background-size: 100%;
  transition: opacity 0.5s ease;
}

.wztalk {
  position: absolute;
  width: 59px;
  height: 269px;
  right: 80px;
  top: 100px;
  z-index: 2;
  transition: opacity 0.5s ease; /* 添加过渡效果 */
}

.wztalk>a{
  display: block;
  width: 90px;
  height: 320px;
  background: url("@/assets/images/wenzhi_talk.png") no-repeat;
  background-size: 100%;
  transition: opacity 0.5s ease;
}

.wzWord {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 120px;
  top: 596px;
  z-index: 8;
  transition: opacity 0.5s ease; /* 添加过渡效果 */
}

.wzWord>a{
  display: block;
  width: 500px;
  height: 140px;
  background: url("@/assets/images/wenzhi_word.png") no-repeat;
  background-size: 100%;
  transition: opacity 0.5s ease;
}




</style>
