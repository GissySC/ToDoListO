import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faTrash, faPen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faTrash, faPen, faFloppyDisk )

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

