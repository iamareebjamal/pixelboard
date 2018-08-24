<template>
  <div class="pixel-board" @click="addPixel">
    <div
      class="pixel"
      v-for="p in pixels"
      :key="p.x"
      :style="{
        backgroundColor: p.color,
        top: p.y + 'px',
        left: p.x + 'px',
      }"
    >
    
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Pixel {
  x: number;
  y: number;
  color: string;
}

@Component
export default class PixelBoard extends Vue {
  private message: string = 'Pello';
  private pixels = {
    ok: {
      x: 23,
      y: 304,
      color: '#33b5e5',
    },
    po: {
      x: 400,
      y: 34,
      color: '#45fd9f',
    },
  };

  private addPixel() {
    console.log(this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .pixel-board
    background-color: #eee;
    border-radius 10px
  
  .pixel
    position absolute
    width 10px
    height 10px

</style>
