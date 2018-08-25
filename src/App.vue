<template>
  <div id="app">
    <PixelBoard class="pixel-board" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PixelBoard from './components/PixelBoard.vue';

@Component({
  components: {
    PixelBoard,
  },
})
export default class App extends Vue {}
</script>
<style lang="stylus">
html, body
  height 100%

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  height 100%

.pixel-board
  height 100%
</style>
