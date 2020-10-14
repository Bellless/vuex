import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // vuex用来定义共享的数据源 
  // 如果是共享的数据源，就不用一层的一层的去组件传参可以使用vuex全局数据管理，解决组件的多层传参复杂性
  // 定义初始化数据
  state: {
    // 在vue中，不能直接在不同的组件中使用this.$store.store.数据名直接修改数据 这样是不合法的
    number: 1,
    count: 2,
  },
  // 只有在mutations中定义的函数才能修改state里面的数据
  // 只能同步操作数据
  mutations: {
    // 1.改变操作数据，可以集中操作监控数据的变化
    // 2.state 为上面的state数据源，step为调用地方传递的参数
    // 3.自定义处理数据的操作函数参数第一个始终会是state
    // 4.mutations函数中不能写异步的代码例如定时器
    addN(state, step) {
      // 变更后的数据
      // setTimeout(() => {
      //   // 异步1秒之后，页面的内容会变化 但是state函数里面的数据不会变
      //   state.number += tep;
      // }, 1000);
      state.number += step;
    },
    jianN(state, step) {
      // 变更后的数据
      state.number -= step;
    },
    addNCount(state, step) {
      // 变更后的数据
      state.count += step;
    },
    jianNCount(state, step) {
      // 变更后的数据
      state.count -= step;
    },
    add(state) {
      state.count += 10;
    }
  },
  // 可以异步操作数据 可以用来发送请求
  // 在actions中不能直接修改state里面的数据
  // 只能通过commit mutations里面的某个方法去修改数据
  actions: {
    addNAsync(context,step) {
      setTimeout(() => {
        context.commit('addNCount',step)
        // context.commit('add')
      }, 2000);
    },
    jianNAsync(context, step) {
      setTimeout(() => {
        // 在actions中不能直接修改state里面的数据
        // 只能通过commit mutations里面的某个方法去修改数据
        context.commit('jianNCount', step)
        // context.commit('add')
      }, 2000);
    }
  },
  // 1.getters只会对store里面的数据进行加工处理成新的数据,并不会修改原始的数据
  // 2.store中的数据发生变化,getters里面的数据也会发生变化
  // 3.getters中是多个函数，每个函数都返回结果
  getters: {
    changeNumber(state){
      return '这是getters改变后的number值为:' + state.number
    }
  },
  modules: {}
});
