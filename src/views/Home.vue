<template>
  <div class="home">
    <div class="one">
      <h1>这是从vuex中获取的number数据:</h1>
      <h1>{{this.$store.state.number}}</h1>
    </div>
    <div class="one">
      <h1>这是从vuex中获取的count数据:</h1>
      <h1>{{this.$store.state.count}}</h1>
    </div>
    <div class="btn">
      <button @click="fnChageNumberone">同步mutations改变vuex的number值(加)</button>
      <button @click="fnChageNumbertwo">同步mutations改变vuex的number值(减)</button>
    </div>
    <div class="btn">
      <button @click="fnChageCountone">同步mutations改变vuex的count值(加)</button>
      <button @click="fnChageCounttwo">同步mutations改变vuex的count值(减)</button>
    </div>
    <div class="btn">
      <button @click="fnChageCountones">同步mutations改变vuex的count值(加)的第二种方式</button>
    </div>
    <div class="btn">
      <button @click="fnChageCountonesAction" style="color:red">异步action改变vuex的count值(加)的第一种方式</button>
      <!-- 如果vuex映射到了当前组件上之后，调用某个方法可以不用再写一个点击事件 -->
      <!-- 可以直接将映射的方法名放到页面结构的位置上 -->
      <button @click="jianNAsync(30)" style="color:red">异步action改变vuex的count值(加)的第二种方式</button>
    </div>
    <div class="btn">
      <!-- 获取getters中的函数的值的第一种方式 -->
      <p>{{this.$store.getters.changeNumber}}</p>
      <!-- 获取getters中的函数的值的第二种方式 -->
      <p>{{changeNumber}}</p>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations,mapActions,mapGetters} from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    // 将vuex中的number映射到当前组件的data数据源中
    ...mapState(['number']),
    ...mapGetters(['changeNumber'])
  },
  methods: {
    // 动态改变vuex的number数据
    fnChageNumberone() {
      // 1.commit触发mutations中的函数的第一种方式
      this.$store.commit("addN", 20);
    },
    fnChageNumbertwo() {
      this.$store.commit("jianN", 10);
    },
    fnChageCountone() {
      this.$store.commit("addNCount", 30);
    },
    fnChageCounttwo() {
      this.$store.commit("jianNCount", 40);
    },
    // 2.获取mutations中的函数的第二种方式
    // 2.1从vuex中按需导入mapMutations函数
    // 2.2将指定的mutations函数映射为当前组件的methods函数
    // 将vuex的muations方法中的addN，jianN方法映射到当前组件的methods中
    ...mapMutations(['addN','jianN']),
    fnChageCountones(){
      this.addN(20);
    },
    // action异步操作数据
    fnChageCountonesAction(){
      // 1.dispatch触发action中的某个函数 第一种方式
      this.$store.dispatch('addNAsync',20)
    },
    // 2.获取action中的函数的第二种方式
    // 2.1从vuex中按需导入mapActions函数
    // 2.2将指定的action函数映射为当前组件的methods函数
    // 将vuex的action方法中的addN方法映射到当前组件的methods中
    ...mapActions(['addNAsync','jianNAsync']),
    // fnChageCountonesActionTwo(){
    //   this.jianNAsync(30);
    // }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 20px auto;
  background-color: burlywood;
  justify-content: center;
  align-items: center;
}

.one {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  display: flex;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    width: 250px;
    height: 100px;
    padding: 20px 0;
    margin: 20px;
  }
}
</style>