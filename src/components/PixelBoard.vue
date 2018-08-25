<template>
  <div>
    <Swatches
      v-if="showColorDialog"
      v-model="color"
      :close-on-select=false
      @close="onDialogClose"
      :style="{
        position: 'absolute',
        top: colorPickerPosition.y + 'px',
        left: colorPickerPosition.x + 'px',
      }" />
    <div class="pixel-board" @click="addPixel">
      <div class="marked">
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
      <div>
        <div
          class="pixel"
          v-if="showColorDialog"
          :style="{
            backgroundColor: color,
            top: selectedPixel.y + 'px',
            left: selectedPixel.x + 'px',
          }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { FirebaseRefs } from '../decorators';
import { db } from '../firebase';

import Swatches from 'vue-swatches';
import 'vue-swatches/dist/vue-swatches.min.css';

interface Pixel {
  x: number;
  y: number;
}

const pixelsRef = db.ref('pixels');
const defaultColor = '#888';

@Component({
  components: {
    Swatches,
  },
})
@FirebaseRefs({
  pixels: pixelsRef,
})
export default class PixelBoard extends Vue {
  private color = defaultColor;
  private pixels = {};
  private selectedPixel: Pixel | null = null;

  private get showColorDialog() {
    return this.selectedPixel !== null;
  }

  private get colorPickerPosition(): Pixel {
    if (this.selectedPixel === null) {
      return {x: 0, y: 0};
    }

    return {
      x: this.selectedPixel.x - 15,
      y: this.selectedPixel.y + 15,
    };
  }

  private onDialogClose() {
    if (this.color !== defaultColor) {
      pixelsRef.push({
        ...this.selectedPixel,
        color: this.color,
      }, (error: Error | null) => {
        if (error !== null) {
          alert('Failed to set color. Sorry');
        }
      });
      this.selectedPixel = null;
      this.color = defaultColor;
    }
  }

  private addPixel(event: { clientX: number, clientY: number }) {
    this.selectedPixel = {
      x: event.clientX - (event.clientX % 10),
      y: event.clientY - (event.clientY % 10),
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .pixel-board
    background-color: #eee
    cursor pointer
    border-radius 10px
  
  .pixel
    position absolute
    width 10px
    height 10px

</style>
