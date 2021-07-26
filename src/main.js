import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import VueMask from 'v-mask'
Vue.use(VueMask)

import { required, email, mimes, alpha_spaces } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Por favor, preencha o {_field_}",
});

extend("date_required", {
  ...required,
  message: "Por favor, preencha a {_field_}",
});

extend("check_required", {
  ...required,
  message: "Você precisa aceitar os termos",
});

extend("file_required", {
  ...required,
  message: "Por favor, selecione um arquivo",
});

extend("email", {
  ...email,
  message: "Insira um endereço de e-mail válido",
});

extend("mimes", {
  ...mimes,
  message: "Insira um arquivo com o formato correto",
});

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Somente são permitidos letras e espaços",
});

extend("not_minor", {
  validate: (value) => {
    let dt = new Date(value).getTime()
    let dt18 = new Date().setFullYear(new Date().getFullYear() - 18)
    
    if (dt <= dt18) {
      return true
    } else {
      return false
    }
    
  },
  message: "Você precisa ser maior de idade para participar"
})

extend("cpf", {
  validate: (value) => {
    let valid = true;
    let cpf = value.replaceAll(".", "").replace("-", "").split("");
    if (
      cpf.every((n, _, a) => {
        return a[0] == n;
      })
    ) {
      return false;
    }
    let v = 0;
    for (let i = 10, j = 0; i >= 2; i--) {
      v += cpf[j] * i;
      j++;
    }
    if ((v * 10) % 11 != cpf[9]) {
      return false;
    }

    v = 0;
    for (let i = 11, j = 0; i >= 2; i--) {
      v += cpf[j] * i;
      j++;
    }
    if ((v * 10) % 11 != cpf[10]) {
      return false;
    }

    return valid;
  },
  message: "CPF inválido",
});
Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)

import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, {
  siteKey: '6LfkrcAbAAAAAPdcas9JqZ994P-WwPduv0pYz5BZ',
  autoHideBadge: true
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
