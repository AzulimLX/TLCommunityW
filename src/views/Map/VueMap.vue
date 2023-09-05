<template>
  <div class="header">
    <!--头部开始-->
   <Header/>
    <!--头部结束-->
  </div>
    <div class="map-box">
      <!--天气开始-->
       <div class="weather">
        <div class="sunShower" v-show=" weather.weatherType==='晴间多云'">
          <div class="cloud"></div>
          <div class="sun">
            <div class="rays"></div>
          </div>
        </div>
          <div class="sunny" v-show="weather.weatherType === '晴'">
            <div class="sun">
              <div class="rays"></div>
            </div>
          </div>
         <div class=" cloudy " v-show="weather.weatherType === '多云' ||weather.weatherType ==='阴'">
           <div class="cloud"></div>
           <div class="cloud"></div>
         </div>

         <div class=" rainy " v-show="weather.weatherType === '阵雨' || weather.weatherType==='小雨' || weather.weatherType==='中雨' || weather.weatherType==='大雨' || weather.weatherType==='暴雨'">
           <div class="cloud"></div>
           <div class="rain"></div>
         </div>

         <div class="thunderStorm " v-show="weather.weatherType === '雷阵雨' || weather.weatherType==='强雷阵雨'">
           <div class="cloud"></div>
           <div class="lightning">
             <div class="bolt"></div>
             <div class="bolt"></div>
           </div>
         </div>

         <div class="flurries " v-show="weather.weatherType === '雪'">
           <div class="cloud"></div>
           <div class="snow">
             <div class="flake"></div>
             <div class="flake"></div>
           </div>
         </div>
        </div>

        <div class="weatherInformation">
          <div class="weatherInformationText">
          <div>地区:{{weather.weatherPlace}}<br>(无详细地址则为省会)</div>
            <br>
          <div>天气类型:{{weather.weatherType}}</div>
            <br>
          <div>温度:{{weather.temperature}}℃</div>
            <br>
          <div>获取时间:{{weather.time}}</div>
          </div>
        </div>
      <!--天气结束-->

      <div class="select-place-text">选择地点</div>
      <el-select v-model="value" class="map-select" placeholder="Select" @change="mapChange">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"

        />
      </el-select>
      <div id="container"></div>
    </div>


</template>

<script setup>
import  Header from '@/views/utils/Header.vue'
//测试天气功能
import {FutureWeather,NowWeather} from "@/api/NewApi/Map";
const weatherPlace = reactive("选择地点后显示")

//地图
import AMapLoader from '@amap/amap-jsapi-loader';
import {shallowRef, onMounted, reactive} from "vue";
//定义一个map对象
const map = shallowRef(null);
//备份AMap对象，以便操作
let MYAMap = null
//初始化地图方法
const initMap = ()=>{
  AMapLoader.load({
    key:"8ef10dbc11794cf277a5de1def85cc96",             // 申请好的Web端开发者Key，首次调用 load 时必填
    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins:[],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap)=>{
    MYAMap = AMap
    map.value = new AMap.Map("container",{  //设置地图容器id
      viewMode:"3D",    //是否为3D地图模式
      zoom:15,           //初始化地图级别
      center:[114.268000,30.579764], //初始化地图中心点位置
    });

  }).catch(e=>{
    console.log(e);
  })
}
//页面挂载完成
onMounted(()=>{
  //调用初始化方法
  initMap()
  //让它先获取自己的定位放进去
  NowWeather().then(res =>{
    //目标数据
    console.log(res.data.data)
    //转为标准JSON
    var v = JSON.parse(res.data.data)
    //存进我们本来准备的集合
    options.push({ value: "我的地址", label: "我的地址" });
    placeMap["我的地址"] = v
  })

})


//选择器
import {ref} from 'vue'
const value = ref('')
//接收接口返回的数组
const options = reactive([])
//建立map映射，名字->坐标 优化寻找
const placeMap = reactive({})
//接收天气的地区，天气类型，温度，获取时间之类的
const weather = reactive({weatherPlace:'',weatherType:'',temperature:'',time:''})

const mapChange = (val)=>{
  NowWeather(placeMap[val].adcode).then(res=>{
    console.log("这是"+placeMap[val].adcode+res.data.data)
    //因为这是后端传过来的JSON字符串，应该先用工具解析了先
    var v = JSON.parse(res.data.data)
    console.log(v.city)
    weather.weatherPlace =v.province + v.city
    weather.weatherType = v.weather
    weather.temperature = v.temperature
    weather.time = v.reporttime
  })
  //获取地址坐标,并按照’,‘分隔成数组然后进行转移
  const target = placeMap[val].coordinate.split(',')
  map.value.setCenter(target)
  //清除覆盖物
  map.value.clearMap()
  //创建标记
  const marker = new MYAMap.Marker({
    position: new MYAMap.LngLat(target[0],target[1]),
    title: val
  });
  //加入标签
  map.value.add(marker)
  //组织语言
  let content = `
   <div style="display: flex;align-items: center">
    <div style="margin-right: 5px"><img style="width: 150px" src="\ ${placeMap[val].photo} \"/></div>
    <div style="font-size: 18px; color: #666;">
    <div>地点名称: ${placeMap[val].name}</div>
    <div style="margin-top: 12px">详细地址: ${placeMap[val].mapname}</div>
    <div style="margin-top: 12px">地点简介: ${placeMap[val].content}</div>
    </div>
   </div>
  `

  //给marker注册点击事件
  marker.on('click',function (e){
    //创建并打开一个信息框
    var infoWindow = new MYAMap.InfoWindow({
      content, //传入dom对象，或者html字符串
      offset: new MYAMap.Pixel(0,-30), //位置偏移量

    });
    infoWindow.open(map.value,target);//一定要在指定的地图打开
  })

}

//圣地巡游信息
import {staticMap} from "@/api/NewApi/Map";

staticMap().then(res=>{

  console.log(res.data.data)
  const dataArray = JSON.parse(res.data.data); // 将 JSON 字符串解析为 JavaScript 对象数组
  // 检查 dataArray 是否是一个数组
  if (Array.isArray(dataArray)) {
    // 遍历数据数组
    dataArray.forEach(function(item) {
      // 访问对象的属性
      var name = item.name;
      // 将 name 添加到 options 数组
      options.push({ value: name, label: name });
      placeMap[name] = item
    });
  } else {
    console.error("Data is not in the expected format.");
  }


})

const target = ()=>{
  FutureWeather().then(res=>{
    //获取天气情况
    console.log(res.data.data)
    console.log(res.data.data[0])
  })

  NowWeather("441226").then(res=>{
    console.log("这是441226"+res)
    console.log("这是441226"+res.data.data)
  })

}

import "@/assets/css/map/VueMap.css"

</script>

<style src="@/assets/css/map/VueMap.css" scoped>
/*天气动态组件们*/

</style>