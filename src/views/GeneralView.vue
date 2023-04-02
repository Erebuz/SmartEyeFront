<template>
  <v-container>
    <v-row>
      <v-col cols='8'>
        <div>
          <live-stream-video-component />
        </div>
      </v-col>

      <v-col cols='4'>
        <div>Текущий фпс FPS: {{ store.getters.getVideo.fps}}</div>

        <v-btn @click='get_fps'>Get fps</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts' setup>
import LiveStreamVideoComponent from '@/components/liveStreamVideoComponent.vue'
import store from '@/store'
import { onMounted, onUnmounted } from 'vue'

let timeout

function get_fps() {
  store.dispatch('api_get_fps')
}

onMounted(() => {
  //timeout = setInterval(get_fps, 5000)
})

onUnmounted(() => {
  //clearInterval(timeout)
})
</script>
