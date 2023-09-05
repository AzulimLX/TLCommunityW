<template>
  <div class="bod">
 <div class="tesst">

   <div class="danImg"></div>
   此功能正常开发中，要是看到说明成功了
 </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

.bod{
  position: relative;
  width: 1480px;
  height: 720px;
  background: #4a4a4a;
}
.danImg{
  display: inline-block; /* 让元素以块级内联元素的方式显示，这样可以与文字处于同一行 */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background-image: url("@/assets/images/wuwu.jpeg");
  background-size: cover;
  vertical-align: middle; /* 垂直对齐方式，使图片与文字在同一水平线上 */

}

.tesst {
  position: absolute;
  right: 740px;
  top: 420px;

  border-radius: 10px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  background: #B9DEFF;
}
</style>