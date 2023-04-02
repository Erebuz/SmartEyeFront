import { createStore } from 'vuex'
import { ComponentInternalInstance } from 'vue'
import VideoService from '@/service/videoService'
import { th } from 'vuetify/locale'

const videoService = new VideoService()

export default createStore<{
  currentInstance: ComponentInternalInstance | null
  video: {
    fps: number
  }
}>({
  state: {
    currentInstance: null,
    video: {
      fps: 0
    }
  },
  getters: {
    getAuth: (state) => state.currentInstance!.proxy!.$auth,
    getVideo: (state) => state.video
  },
  mutations: {},
  actions: {
    set_instance(state, payload: ComponentInternalInstance) {
      console.log(payload.proxy?.$auth)
      this.state.currentInstance = payload
    },
    api_get_fps() {
      return videoService.get_fps().then((res) => {
        this.state.video.fps = res.data
      })
    }
  },
  modules: {},
})
