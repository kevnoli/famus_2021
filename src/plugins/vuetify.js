import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/lib/locale/pt';

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#00995d',
        secondary: '#b1d34b',
        accent: '#f47920',
        error: '#b71c1c',
      },
      dark: {
        primary: '#00995d',
        secondary: '#b1d34b',
        accent: '#f47920',
        error: '#b71c1c',
        background: '#0d1117'
      }
    },
  },
  lang: {
    locales: { pt },
    current: 'pt',
  },
});

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

export default vuetify;
