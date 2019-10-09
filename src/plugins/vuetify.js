import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#01194D',
    secondary: colors.grey.lighten4,
    tertiary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.lighten1,
    info: colors.blue,
    success: colors.green,
    warning: colors.amber.darken2
  }
})

