import { createStore } from 'vuex'
import { ComponentInternalInstance } from 'vue'

export default createStore<{
  currentInstance: ComponentInternalInstance | null
}>({
  state: {
    currentInstance: null,
  },
  getters: {
    getAuth: (state) => state.currentInstance!.proxy!.$auth
  },
  mutations: {},
  actions: {
    set_instance(state, payload: ComponentInternalInstance) {
      console.log(payload.proxy?.$auth)
      this.state.currentInstance = payload
    },
  },
  modules: {},
})
