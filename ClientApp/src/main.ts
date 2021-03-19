import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify'
import { User } from './models/User'
import './plugins/base'
import './plugins/vee-validate'
import i18n from './i18n'

Vue.config.productionTip = false

store.dispatch('init');
console.log(process.env);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  mounted: async function() {
    if(store.state.auth.jwt){
      await this.$store.dispatch("profile");
      await this.$store.dispatch("projects/getProjects");
    }
  },
  render: h => h(App)
}).$mount('#app')
