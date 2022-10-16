import { createApp } from 'vue'
import {
  Quasar,
  LocalStorage,
} from 'quasar'
import '@quasar/extras/material-icons/material-icons.css' // icon libraries
import 'quasar/src/css/index.sass' // Quasar css
import './style.css'
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
    LocalStorage
  },
})

myApp.mount('#app')
