import { createStore } from 'vuex'
import { ComponentInternalInstance } from 'vue'
import VideoService from '@/service/videoService'
import NnService from '@/service/nnService'
import UserService from '@/service/UserService'
import { th } from 'vuetify/locale'

const videoService = new VideoService()
const nnService = new NnService()
const userService = new UserService()

export default createStore<{
  currentInstance: ComponentInternalInstance | null
  video: {
    fps: {
      current: number, max: number, target: number
    }
  },
  nn: {
    enable: boolean
    classes: Record<string, string>
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
      skip: 0,
      classes: {}
    }
  },
  getters: {
    getAuth: (state) => state.currentInstance!.proxy!.$auth,
    getVideo: (state) => state.video,
    getNN: (state) => state.nn
  },
  mutations: {
    SOCKET_ONOPEN: () => {
      return
    },
    SOCKET_ONCLOSE: () => { return},
    SOCKET_ONERROR: () => { return},
    SOCKET_ONMESSAGE: () => { return},
    SOCKET_RECONNECT: () => { return},
    SOCKET_RECONNECT_ERROR: () => { return},
  },
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
      return nnService.set_frame_skip(val).then(() => {
        this.dispatch('api_get_skip')
      })
    },
    api_get_enable_nn() {
      return nnService.get_nn_enable().then(res => {
        this.state.nn.enable = res.data.show_osd
        this.state.nn.classes = res.data.classes
      })
    },
    api_set_enable_nn(state, val: boolean) {
      return nnService.set_nn_enable(val)
    },
    api_set_classes(state, val: Record<string, string>) {
      return nnService.set_nn_classes(val)
    },
    api_update_me(state, payload: {password?: string, username: string}) {
      return userService.update_me(payload)
    },
    update(state, wsEvent: { data: { fps : any}}) {
      state.state.video.fps = wsEvent.data.fps
    }
  },
  modules: {},
})
