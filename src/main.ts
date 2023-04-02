import { createApp } from 'vue'
import App from './App.vue'
import { appUseRouter } from './router'
import { appUseHttp } from '@/plugins/http-common'
import { appUseAuth } from '@/plugins/auth'
import store from './store'
import { mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
appUseRouter(app)
appUseHttp(app)
appUseAuth(app)
app.use(store)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
    },
  },
})

app.use(vuetify)

app.mount('#app')
