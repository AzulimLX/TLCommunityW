import { createStore } from 'vuex'

export default createStore({
  //创建仓库
  state: { name:'马云'
  },
  //使用方法调用仓库数据

  getters: {
  },
  //同步调用
  mutations: {
    trigger(state){
      state.name='马化腾'
    }
  },
  //异步调用
  actions: {
    sub(store){
      store.commit('trigger')
    }
  },
  modules: {
  }
})
