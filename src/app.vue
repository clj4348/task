<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from './views/layout/header.vue'
import Footer from './views/layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default{
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {
      text: 'abc'
    }
  }
}
</script>
<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background url('./assets/images/bg.jpeg') no-repeat center
    background-size cover
    z-index: 0
  #cover
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .6
    z-index -1
</style>
