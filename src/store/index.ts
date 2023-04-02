import { createStore } from 'vuex'
import { ComponentInternalInstance } from 'vue'
import VideoService from '@/service/videoService'
import NnService from '@/service/nnService'

const videoService = new VideoService()
const nnService = new NnService()

export default createStore<{
  currentInstance: ComponentInternalInstance | null
  video: {
    fps: {
      current: number, max: number, target: number
    }
  },
  nn: {
    enable: boolean
    skip: number
  }
}>({
  state: {
    currentInstance: null,
    video: {
      fps: {
        current: 0,
        max: 0,
        target: 0
      }
      },
    nn: {
      enable: false,
      skip: 0
    }
  },
  getters: {
    getAuth: (state) => state.currentInstance!.proxy!.$auth,
    getVideo: (state) => state.video,
    getNN: (state) => state.nn
  },
  mutations: {},
  actions: {
    set_instance(state, payload: ComponentInternalInstance) {
      this.state.currentInstance = payload
    },
    api_get_fps() {
      return videoService.get_fps().then((res) => {
        this.state.video.fps = res.data
      })
    },
    api_set_fps(state, fps: number) {
      return videoService.set_fps(fps)
    },
    api_get_skip() {
      return nnService.get_frame_skip().then(res => {
        this.state.nn.skip = res.data
      })
    },
    api_set_skip(state, val: number) {
      return nnService.set_frame_skip(val)
    },
    api_get_enable_nn() {
      return nnService.get_nn_enable().then(res => {
        this.state.nn.enable = res.data
      })
    },
    api_set_enable_nn(state, val: boolean) {
      return nnService.set_nn_enable(val)
    },
  },
  modules: {},
})
