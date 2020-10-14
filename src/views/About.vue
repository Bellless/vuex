<template>
  <div class="content">
    <div class="one">
      <h1>这是从vuex中获取的数据:</h1>
      <h1>{{this.$store.state.number}}</h1>
      <h1>{{this.$store.state.count}}</h1>
    </div>
    <div>{{reverseTitle}}</div>
    <div>{{reverseTitle1()}}</div>
    <button @click="add()">补充货物1</button>
    <div>总价为：{{price}}</div>
    <p>{{firstName}}</p>
    <p>{{lastName}}</p>
    <button @click="fnGetTarget(e,1)">获取点击事件的事件对象</button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      title: "标题",
      firstName: "Foo",
      lastName: "Bar"
    };
  },
  watch: {},
  // 计算属性
  // 1.在一个计算属性里可以完成各种复杂的逻辑，包括运算、函数调用等，只要最终返回一个结果就可以。
  // 2.计算属性可以缓存 watch不可以
  // 3.计算属性只有在它的相关依赖发生改变时才会重新求值。
  // 4.data和computed都是属性 computed里面是可以放置一些业务逻辑的代码，一定记得return
  computed: {
    reverseTitle: function() {
      //而使用计算属性，只要title没变，页面渲染是不会重新进这里来计算的，而是使用了缓存。
      return this.title
        .split("")
        .reverse()
        .join("");
    },
    price: function() {
      return this.$store.state.number * this.$store.state.count;
    },
    // getter
    get: function() {
      return this.firstName + " " + this.lastName;
    }
    // setter
    // set: function(newValue) {
    //   var names = newValue.split(" ");
    //   this.firstName = names[0];
    //   this.lastName = names[names.length - 1];
    // }
  },
  // 相比之下每当触发重新渲染时，调用方法将总会再次执行函数。
  // 我们为什么需要缓存？假设我们有一个性能开销比较大的的计算属性A，它需要遍历一个巨大的数组并做大量的计算。 然后我们可能有其他的计算属性依赖于 A。
  // 如果没有缓存，我们将不可避免的多次执行A的getter！如果你不希望有缓存，请用方法来替代
  methods: {
    add: function() {
      this.$store.state.number++;
    },
    reverseTitle1: function() {
      //点击补充货物，也会进这个方法，再次计算。
      // 不是刷新，而是只要页面渲染，就会进方法里重新计算
      return this.title
        .split("")
        .reverse()
        .join("1");
    },
    // 获取点击事件的事件对象
    fnGetTarget(e,id) {
      console.log(e.target);
      console.log(id);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.content {
  /* display: flex; */
  width: 80%;
  margin: 0 auto;
  align-items: center;
  background-color: aqua;
  justify-content: center;
}

.one {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>