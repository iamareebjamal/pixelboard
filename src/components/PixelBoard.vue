<template>
  <div>
    <Swatches
      class="swatches"
      v-if="showColorDialog"
      v-model="color"
      colors="material-basic"
      :close-on-select=false
      @close="onDialogClose"
      :style="{
        top: colorPickerPosition.y + 'px',
        left: colorPickerPosition.x + 'px',
      }" />
    <div
      class="remove"
      v-if="selectedPixelKey"
      @click="remove"
      :style="{
        top: (selectedPixel.y - 30) + 'px',
        left: (selectedPixel.x - 5) + 'px',
      }">
      <span>x</span>
    </div>
    <div class="pixel-board" @click="addPixel" :style="{
        cursor: this.ready ? 'pointer': 'inherit'
      }">
      <div class="marked">
        <div
          class="pixel"
          v-for="p in pixels"
          :key="p['.key']"
          :style="{
            backgroundColor: p.color,
            top: p.y + 'px',
            left: p.x + 'px',
          }"
        >
      </div>
      <div
        class="pixel"
        v-if="showColorDialog"
        :style="{
          backgroundColor: color,
          top: selectedPixel.y + 'px',
          left: selectedPixel.x + 'px',
        }"></div>
      </div>
      <div v-if="loading" class="loading">
        <img src="https://loading.io/spinners/dual-ring/index.dual-ring-loader.svg" height="80px" width="80px" alt="Loading">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { FirebaseRefs } from '@/decorators'
import { db } from '@/firebase'

import Swatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.min.css'

interface Pixel {
  x: number
  y: number
}

interface PixelReference extends Pixel {
  '.key': string
}

const defaultColor = '#888'

@Component({
  components: {
    Swatches,
  },
})
@FirebaseRefs({
  pixels: {
    source: db.ref('pixels'),
    readyCallback() {
      // @ts-ignore
      this.loading = false
    },
  },
})
export default class PixelBoard extends Vue {
  private color = defaultColor
  private pixels: PixelReference[] = []
  private loading = true
  private selectedPixel: Pixel | null = null
  private selectedPixelKey: string | null = null

  private get ready() {
    return !this.loading
  }

  private get showColorDialog() {
    return this.selectedPixel !== null
  }

  private get colorPickerPosition(): Pixel {
    if (this.selectedPixel === null) {
      return {x: 0, y: 0}
    }

    return {
      x: this.selectedPixel.x - 22,
      y: this.selectedPixel.y - 35,
    }
  }

  private remove() {
    if (this.selectedPixelKey !== null) {
    // @ts-ignore
    (this.$firebaseRefs.pixels as firebase.database.Reference)
      .child(this.selectedPixelKey)
      .remove((error: Error | null) => {
        if (error !== null) {
          alert('Could not remove pixel. Please try again')
        }
      })
    }

    this.selectedPixel = null
    this.selectedPixelKey = null
  }

  private onDialogClose() {
    if (this.color !== defaultColor) {
      // @ts-ignore
      const pixelsRef = (this.$firebaseRefs.pixels as firebase.database.Reference)
      const errorHandler = (error: Error | null) => {
        if (error !== null) {
          alert('Failed to set color. Sorry')
        }
      }

      if (this.selectedPixelKey === null) {
        pixelsRef.push({
          ...this.selectedPixel,
          color: this.color,
        }, errorHandler)
      } else {
        pixelsRef.child(this.selectedPixelKey)
          .update({
            color: this.color,
          }, errorHandler)
      }

      this.selectedPixel = null
      this.selectedPixelKey = null
      this.color = defaultColor
    }
  }

  private addPixel(event: { pageX: number, pageY: number }) {
    if (this.loading) {
      return
    }

    this.selectedPixel = {
      x: event.pageX - (event.pageX % 10),
      y: event.pageY - (event.pageY % 10),
    }

    const pixels = this.pixels
                .filter(item => this.selectedPixel !== null &&
                  item.x === this.selectedPixel.x &&
                  item.y === this.selectedPixel.y)

    const latest = pixels.pop()
    this.selectedPixelKey = latest !== undefined ? latest['.key'] : null

    // TODO: Add a cloud function to delete stale points
    /*
    if (pixels.length > 0) {
      // @ts-ignore
      const pixelsReference = (this.$firebaseRefs.pixels as firebase.database.Reference)
      const updatePayload: Record<string, null> = {}
      pixels.forEach(item => {
        updatePayload[item['.key']] = null
      })

      pixelsReference.update(updatePayload)
    }
    */
  }
}
</script>

<style lang="stylus">
  .vue-swatches__trigger
    box-shadow 0px 0px 3px 1px rgba(119, 119, 119, 0.4)
  
  .vue-swatches:first-child
    width 42px
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .pixel-board
    background-color: #eee
    border-radius 10px
  
  .pixel
    position absolute
    width 10px
    height 10px
  
  .swatches
    height 0
    z-index 1
  
  .remove
    cursor pointer
    position absolute
    background-color #ffcdd2
    color #f44336
    width 20px
    height 20px
    border-radius 20px
    z-index 1
  
  .remove:hover
    box-shadow 0px 0px 3px 1px rgba(119, 119, 119, 0.4)
  
  .remove>span
    padding-left 6px
  
  .loading
    width 100px
    height 100px

    position absolute
    left 0
    right 0
    top 0
    bottom 0
    margin auto

    max-width 100%
    max-height 100%
    overflow auto
</style>
