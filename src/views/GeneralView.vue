<template>
  <v-container>
    <v-row>
      <v-col cols='8'>
        <div>
          <live-stream-video-component />
        </div>
      </v-col>

      <v-col cols='4'>
        <div>Максимальный FPS: <b>{{video.fps.max}}</b></div>
        <div>Целевой FPS: <b>{{video.fps.target}}</b></div>
        <div>Текущий FPS: <b>{{video.fps.current}}</b></div>

        <div>
          <v-text-field v-model.number='current_fps' type='number' label='FPS' />
        </div>

        <div>
          <v-text-field v-model.number='skip' type='number' label='Пропуск кадров' />
        </div>

        <div>
          <v-switch v-model='enable_nn' label='Нейросеть включена' />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts' setup>
import LiveStreamVideoComponent from '@/components/liveStreamVideoComponent.vue'
import store from '@/store'
import { computed, onMounted, onUnmounted } from 'vue'

store.dispatch('api_get_skip')
store.dispatch('api_get_enable_nn')

let timeout

const current_fps = computed({
  get() {
    return store.getters.getVideo.fps.target
  },
  set(val:number) {
    store.dispatch('api_set_fps', val)
  }
})

const video = computed(() => store.getters.getVideo)

const skip = computed({
  get() {
    return store.getters.getNN.skip
  },
  set(val:number) {
    store.state.nn.skip = val
    store.dispatch('api_set_skip', val)
  }
})

const enable_nn = computed({
  get() {
    return store.getters.getNN.enable
  },
  set(val: boolean) {
    store.state.nn.enable = val
    store.dispatch('api_set_enable_nn', val)
  }
})

function get_fps() {
  store.dispatch('api_get_fps')
}

onMounted(() => {
  timeout = setInterval(get_fps, 1000)
})

onUnmounted(() => {
  clearInterval(timeout)
})
</script>
