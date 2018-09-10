<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getData">点击加载数据</button>
    <ul>
      <li v-for="(item, index) in mockData" :key="index">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
import { getMockData } from '../services/demoService'

export default {
  name: 'HelloWorld',
  data() {
    return {
      mockData: {}
    }
  },
  methods: {
    getData() {
      getMockData().then(res => (this.mockData = res.data))
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
