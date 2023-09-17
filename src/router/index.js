import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"

const routes = [
    {   //第一个为希望访问时第一个获取的页面
        //创建登录界面
        path:'/',
        name:'login',
        //按需引入
        component:()=>import(/*webpackChunkName:'Login'*/'@/views/login/login.vue')
    },

    {
        //创建登录后界面
        path:'/main',
        name:'Main',
        meta: { requiresAuth: true},//是否需要登陆验证
        //按需引入
        component:()=>import(/*webpackChunkName:'Main'*/'@/views/Main/Main.vue')
    },

    {
      //测试登录重定向问题
        path:'/Welcome',
        name:'test',
        meta: { requiresAuth: true},//是否需要登陆验证
        //按需引入
        component:()=>import(/*webpackChunkName:'Main'*/'@/views/Welcome.vue')
    },
    {
        //地图
        path:'/map',
        name: 'map',
        meta: { requiresAuth: true},//是否需要登陆验证
        //按需引入
        component:()=>import(/*webpackChunkName:'Main'*/'@/views/Map/VueMap.vue')
    },
    {
      //个人空间
      path:'/spaces',
      name:'selfSpaces',
      mata:{requiresAuth: true},
      component:()=> import('@/views/spaces/spaces.vue')
    },
    {
        //留言板弹幕
        path:'/barrage',
        name:'barrage',
        mata: {requiresAuth: true},
        component:()=> import('@/views/barrage/barrage.vue')
    },
    {
        //查看别人的空间
        path:'/otherSpaces',
        name:'barrage',
        mata: {requiresAuth: true},
        component:()=>import('@/views/otherSpaces/otherSpaces.vue')
    },
    {
        //测试页面
        path:'/test',
        name: 'test',
        //按需引入
        component:()=>import(/*webpackChunkName:'Main'*/'@/views/login/test.vue')
    },
    {
        //测试页面2
        path:'/test2',
        name: 'ces',
        //按需引入
        component:()=>import(/*webpackChunkName:'Main'*/'@/views/login/teee.vue')
    },
    {
      //测试页3
        path:'/test3',
        name:'sss',
        component:()=>import(/*webpackChunkName:'Main'*/'@/views/tett.vue')
    },

    ]

const router = createRouter({
    //内部提供了history模式的实现，这里选择hash形式实现
    history:createWebHistory(),
    routes,
})


import {useTokenStore} from "@/store/Mytoken";
import {getInfo} from "@/api/NewApi/login";
import {onMounted, ref} from "vue";
//在每一个路由地址变化之前 形参为：去哪，在哪里来，去到的下一步干什么
router.beforeEach((to,from,next)=>{
    //首先判断去的地址是否需要验证
    //matched= 会把路由拆分 /main/ss/xx:   /main  /main/ss  /main/ss/xx
    if (to.matched.some(r=>r.meta.requiresAuth))
    {
        //如果存在，则需要找token
        const store = useTokenStore()
        if (!store.token?.token)
        {
             //如果没有token,则跳转 ,按路由的name查询， 之后query则记住你登陆完了之后跳转到哪里
            next({ name: "login", query: { redirect: to.fullPath } })
            return
        }

    }
    //调用才会往后走，不然请求会被一直拦截
    next()
})

//导出去
export  default router