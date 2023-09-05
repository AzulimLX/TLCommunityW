<template>
  <div class="bigbox">
  <div class="box">
    <div class="pre-box" ref="preRef">
      <h1>WELCOME</h1>
      <p>JOIN US!</p>
      <div class="img-box">
        <img :src="flag==true?imgList[1]:imgList[0]" alt="">
      </div>
    </div>

    <!--下面是注册的表格-->
    <div  class="register-form">
      <div class="title-box">
        <h1 v-show="!flag" >注册</h1>
      </div>
      <el-form :model="registerForm" :rules="rules" :ref="registerFormRef" label-width="5px">
        <el-form-item prop="username" label=" " v-show="!flag">
          <el-input  v-show="!flag" type="text" v-model="registerForm.username" placeholder="用户名" :suffix-icon="User"/>
        </el-form-item>
        <el-form-item prop="password" label=" " v-show="!flag">
          <el-input  v-show="!flag" type="password" v-model="registerForm.password"  placeholder="密码" :suffix-icon="Lock"/>
        </el-form-item>
        <el-form-item prop="confirmPassword" label=" " v-show="!flag">
          <el-input  v-show="!flag" type="password"  v-model="registerForm.confirmPassword" placeholder="确认密码" :suffix-icon="Lock"/>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <button  v-show="!flag" @click="signup" >注册</button>
        <p  v-show="!flag" @click="mySwitch">已有账号?去登录</p>
      </div>

    </div>

    <!--下面为登录的表格-->
    <div class="login-form">
      <div class="title-box">
        <h1 v-show="flag" >登录</h1>
      </div>
      <el-form :model="loginForm" :rules="rules" :ref="loginFormRef" label-width="5px">
        <el-form-item prop="username" label=" "  v-show="flag">
          <el-input  v-show="flag" v-model="loginForm.username"  type="text" placeholder="用户名" :suffix-icon="User"/>
        </el-form-item>
        <el-form-item prop="password" label=" "  v-show="flag">
          <el-input  v-show="flag" v-model="loginForm.password" type="password"  placeholder="密码" :suffix-icon="Lock"/>
        </el-form-item>

      </el-form>
      <div class="btn-box">
        <el-button  :plain="true" v-show="flag" @click="login" :loading="isLoading">登录</el-button>
        <p  v-show="flag"  @click="mySwitch">没有账号?去注册</p>
      </div>
    </div>
  </div>
  </div>
</template>



<script setup>

import {reactive, toRefs ,ref} from "vue";
import {User,Lock} from '@element-plus/icons-vue'
import api from '@/api/login.js'
import {ElMessage} from "element-plus";
import router from "@/router";


    const user = reactive({
      account:'',

    });
    //滑动
    const preRef =ref('')
    const imgList = ref([require('@/assets/images/mxj01.png'),require('@/assets/images/wenzhi03.png')])
    let flag = ref(true)
    const mySwitch =()=>
    {
      if (flag.value) {
        preRef.value.style.background = 'rgba(252, 224, 182, 0.5)'
        preRef.value.style.transform = 'translateX(100%)'

      }else {
        preRef.value.style.background = 'rgba(206,183,254,.6)'
        preRef.value.style.transform = 'translateX(0%)'

      }
      flag.value = !flag.value
    };

    //表格数据
    const loginForm = reactive({
      username:'',
      password:''
    });



    const registerForm = reactive({
      username:'',
      password:'',
      confirmPassword:''
    })

    const loginFormRef = ref('')
    const registerFormRef = ref('')


    //确认密码的规则
    var validatePass2 = (rules,values,callback)=>{
      if (values ==="")
      {
        callback(new Error("请输入密码"));
      }
      else if (values !== registerForm.password)
      {
        callback(new Error("两次密码输入不同"));
      }
      else{
        callback();
      }
    }


    //规则
    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 12, message: '长度应该3-12字符之间', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 10,max: 20 ,message: '不小于10个字符,不多于20', trigger: 'blur' },
      ],
      confirmPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {  min: 10 , max: 20 , message: '不小于10个字符,不多于20', trigger: 'blur' },
        {  validator: validatePass2, trigger: 'blur'}
      ]
        }
    );

    //验证登录状态
    const isLoading = ref(false)

    import apii from '@/api/NewApi/login.js'
    import axios from "axios";
    import {useTokenStore} from "@/store/Mytoken";
    import {useRoute} from 'vue-router'
    const redirectRoute = useRoute()

    const store = useTokenStore()
    const login = ()=>{
        isLoading.value = true
        apii.Nlogin(loginForm).then(res=>{
          console.log(res.data)
          if (res.data.status === 200)
          {
           // localStorage.token = res.data
            ElMessage({
              message : '操作成功',
              type: 'success'
            })
            //保存
            store.saveToken(res.data.data)

            console.log(res)
            console.log(res.data)
            console.log(res.data.data)
            console.log(store.token)

            router.push(redirectRoute.query.redirect|| "main")

          }
          else {
            ElMessage.error(res.data.msg);
            //登录成功后拼接返回的token window.sessionStorage.setItem('token',res.token)
            isLoading.value=false
          }
        }).catch(error=>{
          console.log(error)
          isLoading.value=false
        })

    }



    //注册按钮
    const signup = ()=>{

    }




</script>

<style src="@/assets/css/login.css" scoped>

</style>


