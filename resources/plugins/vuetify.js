import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import '@mdi/font/css/materialdesignicons.css'

import DatetimePicker from 'vuetify-datetime-picker'
import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(Vuetify)
Vue.use(DatetimePicker)
Vue.use(VueMoment, {
    moment,
})

const opts = {
    icons: {
        iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
}

export default new Vuetify(opts)
