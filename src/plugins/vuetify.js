import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.blue.lighten1,
    secondary: colors.grey.lighten3,
    tertiary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.lighten1,
    info: colors.blue,
    success: colors.teal.darken3,
    warning: colors.amber.darken2
  }
})

