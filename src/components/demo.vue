<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button @click="playMusic">点击播放音乐</button>
        <ul>
            <li v-for="(item, index) in mockData" :key="index">{{item.title}}</li>
        </ul>
        <canvas width="1000px" height="300px" id="canvas"></canvas>
    </div>
</template>

<script>
import { getAudio } from '../services/demoService'

const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const source = audioCtx.createBufferSource()
const analyser = audioCtx.createAnalyser()
const size = 64
analyser.fftsize = size * 2
analyser.connect(audioCtx.destination)

export default {
  name: 'HelloWorld',
  data() {
    return {
      mockData: {},
      ctx: null,
      canvas: null
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    const line = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)
    line.addColorStop(0, 'red')
    line.addColorStop(0.5, 'yellow')
    line.addColorStop(1, 'green')
    this.ctx.fillStyle = line
    this.getData()
  },
  methods: {
    getData() {
      getAudio('02.mp3').then(res => {
        audioCtx.decodeAudioData(res.data).then(buffer => {
          source.buffer = buffer
          source.connect(analyser)
        })
      })
    },
    playMusic() {
      source.start()
      this.musicAnalyser()
    },
    musicAnalyser() {
      const arr = new Uint8Array(analyser.frequencyBinCount)
      const v = () => {
        analyser.getByteFrequencyData(arr)
        this.draw(arr)
        requestAnimationFrame(v)
      }
      requestAnimationFrame(v)
    },
    draw(arr) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      const w = this.canvas.width / size
      for (let i = 0; i < size; i++) {
        const h = arr[i]
        this.ctx.fillRect(w * i, this.canvas.height - h, w * 0.8, h)
      }
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
