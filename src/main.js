import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons from the free solid set */
import {
  faCoffee,
  faHome,
  faUser,
  faCartShopping,
  faHeart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCoffee, faHome, faUser, faCartShopping, faHeart, faTrash)

const app = createApp(App)
app.directive('fontSize', (el, binding) => {
  el.style.fontSize = binding.value + 'px'
})
app.directive('fontColor', (el, binding) => {
  el.style.color = binding.value
})
app.directive('fontStyle', (el, binding) => {
  el.style.fontStyle = binding.value
})
app.directive('fontWeight', (el, binding) => {
  el.style.fontWeight = binding.value
})
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)
const pinia = createPinia()
app.use(pinia)
app.mount('#app')
