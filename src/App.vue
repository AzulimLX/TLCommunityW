<template>
  <router-view/>
</template>

<style>

</style>

<script>

export default {

}

</script>

<style >
.danImg{
  display: inline-block; /* 让元素以块级内联元素的方式显示，这样可以与文字处于同一行 */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;

  background-size: cover;
  vertical-align: middle; /* 垂直对齐方式，使图片与文字在同一水平线上 */
}

.TanText{
  right: -200px;
  color: black;
  position: fixed;
  font-size: 20px;
  white-space: nowrap;

  border-radius: 10px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  background: #B9DEFF;
}


</style>
