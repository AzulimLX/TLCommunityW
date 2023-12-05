<template>
  <div>
    <input v-model="searchTerm" placeholder="搜索..." />
    <ul>
      <li v-for="item in filteredItems" :key="item.user">{{ item.username}}</li>
    </ul>
  </div>

  <div class="show-box">
    <el-avatar class="avatar" shape="square" :size="50" :src="squareUrl" />
  </div>

</template>

<script setup>

import { reactive, toRefs } from 'vue'

const state = reactive({
  circleUrl:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
      'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',

})

const { circleUrl, squareUrl, sizeList } = toRefs(state)


import {ref, computed, onMounted} from 'vue';
import {selectAllUser} from "@/api/NewApi/User";

let list = ref([])
onMounted(async ()=>{
  const result = await selectAllUser()
  list.value = result.data.data
  console.log(list.value)
})

const searchTerm = ref('');

const items = ref([
  { id: 1, name: '苹果' },
  { id: 1, name: '香蕉' },
  { id: 3, name: '橙子' },
  { id: 4, name: '葡萄' },
]);

const filteredItems = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return list.value.filter(item => {
    const userMatch = item.user.toLowerCase().includes(term);
    const usernameMatch = item.username.toLowerCase().includes(term);
    return userMatch || usernameMatch;
  });
});
</script>

<style src="@/assets/css/test.css">

</style>
